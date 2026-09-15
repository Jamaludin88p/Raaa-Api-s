
import type { Context, Next } from 'hono'

interface ClientRate {
    count: number
    resetTime: number
}

const clients = new Map<string, ClientRate>()

const config = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    whitelist: ['127.0.0.1'],
    banList: ['']
}

export const rateLimiter = () => {
    return async (c: Context, next: Next) => {
        const ip = c.req.header('x-forwarded-for') || '127.0.0.1'

        if (config.banList.includes(ip)) {
            return c.json({
                error: 'Forbidden',
                message: 'Your IP has been banned.',
                status: 403
            }, 403)
        }

        if (config.whitelist.includes(ip)) {
            await next()
            return
        }

        const now = Date.now()

        if (!clients.has(ip)) {
            clients.set(ip, { count: 1, resetTime: now + config.windowMs })
        } else {
            const client = clients.get(ip)
            if (now > client.resetTime) {
                clients.set(ip, { count: 1, resetTime: now + config.windowMs })
            } else {
                client.count++
                if (client.count > config.max) {
                    return c.json({
                        error: 'Too Many Requests',
                        message: 'Rate limit exceeded. Please try again later.',
                        status: 429
                    }, 429)
                }
            }
        }
        await next()
    }
}
