import type { OpenAPIHono } from '@hono/zod-openapi'
import type { Context } from 'hono'

export const register = (app: OpenAPIHono, route: any, handler: (c: Context) => any) => {
    app.openapi(route, (c: Context) => {
        if (route['x-status'] === 'OFFLINE') {
            return c.json({
                error: 'Service Unavailable',
                message: 'This endpoint is currently OFFLINE.',
                status: 503
            }, 503)
        }
        return handler(c)
    })
}
