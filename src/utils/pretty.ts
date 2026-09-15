import type { Context, Next } from 'hono'
import { settings } from '../config/setting.js'

export const prettyPrint = async (c: Context, next: Next) => {
    await next()
    const contentType = c.res.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
        try {
            const body = await c.res.json()
            if (body && typeof body === 'object' && !Array.isArray(body)) {
                const formattedBody = {
                    creator: settings.creator,
                    ...body
                }
                c.res = new Response(JSON.stringify(formattedBody, null, 4), {
                    status: c.res.status,
                    headers: c.res.headers
                })
                c.res.headers.set('Content-Type', 'application/json; charset=utf-8')
            }
        } catch (e) {
            // Ignore parse errors for non-standard responses
        }
    }
}
