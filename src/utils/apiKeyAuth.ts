import type { Context, Next } from 'hono'
import { settings } from '../config/setting.js'

export const apiKeyAuth = async (c: Context, next: Next) => {
    // Lewati cek apikey untuk endpoint OpenAPI spec atau dokumentasi
    const path = c.req.path
    if (path === '/openapi.json' || path.startsWith('/docs')) {
        return await next()
    }

    const apiKey = c.req.query('apikey') || c.req.header('x-api-key')

    if (!apiKey) {
        return c.json({
            status: false,
            error: 'Unauthorized',
            message: 'API Key is missing. Please provide apikey query parameter (e.g. ?apikey=kyuzx).'
        }, 401)
    }

    if (!settings.validApiKeys.includes(apiKey)) {
        return c.json({
            status: false,
            error: 'Forbidden',
            message: 'Invalid API Key provided.'
        }, 403)
    }

    await next()
}
