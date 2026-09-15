import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'

// --------- API ROUTES ---------
import { statsRoute, statsHandler } from './api/stats/routes.ts'
import { cosplayRoute, cosplayHandler } from './api/random/cosplay.ts'
import { tiktokRoute, tiktokHandler } from './api/downloader/tiktok.ts'

// --------- UTILS ---------
import { logApiRequest } from './utils/logApiRequest.ts'
import { rateLimiter } from './utils/rateLimit.ts'
import { prettyPrint } from './utils/pretty.ts'
import { apiKeyAuth } from './utils/apiKeyAuth.ts'
import logger from './utils/logger.ts'
import { register } from './utils/route.ts'
import { handleTelegramUpdate } from './utils/telegramBotListener.ts'

const app = new OpenAPIHono()

app.use('*', secureHeaders())
app.use('*', cors())
app.use('*', logApiRequest)
app.use('*', rateLimiter())
app.use('*', prettyPrint)
app.use('/api/*', apiKeyAuth)

// --------- REGISTER ROUTES ---------
register(app, statsRoute, statsHandler)
register(app, cosplayRoute, cosplayHandler)
register(app, tiktokRoute, tiktokHandler)

// --------- TELEGRAM WEBHOOK ---------
// Ganti model polling (while(true) getUpdates) yang lama dengan webhook,
// karena Vercel Serverless tidak bisa menjalankan proses yang hidup selamanya.
// Setelah deploy, daftarkan URL endpoint ini ke Telegram (lihat catatan setup).
app.post('/api/telegram/webhook', async (c) => {
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET
    if (expectedSecret) {
        const receivedSecret = c.req.header('x-telegram-bot-api-secret-token')
        if (receivedSecret !== expectedSecret) {
            return c.json({ ok: false }, 401)
        }
    }

    const update = await c.req.json().catch(() => null)
    if (update) {
        await handleTelegramUpdate(update)
    }
    return c.json({ ok: true })
})

const openApiConfig = {
    openapi: '3.0.0',
    info: {
        version: '2.0.0',
        title: 'Kyzz APIs v2 - RESTful Service Documentation',
        description: 'Simple, reliable, & high-performance REST API services built with Next.js 16, Hono.js, & NJS Engine.',
        contact: {
            name: 'Mommy Kyuu',
            url: 'https://whatsapp.com/channel/0029Vb7gcbuLdQelWzrTzD3D'
        }
    },
    servers: [
        {
            url: 'https://api.kyzzz.xyz',
            description: 'Production Server'
        },
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        }
    ]
}

app.doc('/openapi.json', openApiConfig)

app.onError((err, c) => {
    logger.error(`[Error] ${err.message}`)
    return c.json({
        error: 'Internal Server Error',
        message: err.message,
        status: 500
    }, 500)
})

export default app        title: 'Kyzz APIs v2 - RESTful Service Documentation',
        description: 'Simple, reliable, & high-performance REST API services built with Next.js 16, Hono.js, & NJS Engine.',
        contact: {
            name: 'Mommy Kyuu',
            url: 'https://whatsapp.com/channel/0029Vb7gcbuLdQelWzrTzD3D'
        }
    },
    servers: [
        {
            url: 'https://api.kyzzz.xyz',
            description: 'Production Server'
        },
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        }
    ]
}

app.doc('/openapi.json', openApiConfig)

app.onError((err, c) => {
    logger.error(`[Error] ${err.message}`)
    return c.json({
        error: 'Internal Server Error',
        message: err.message,
        status: 500
    }, 500)
})

export default app
