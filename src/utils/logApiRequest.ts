import type { Context, Next } from 'hono'
import logger from './logger.js'
import Color from './color.js'
import { sendTelegramLog } from './telegramNotifier.js'
import { incrementHitCount } from './telegramBotListener.js'

export const logApiRequest = async (c: Context, next: Next) => {
    incrementHitCount()
    const start = performance.now()
    await next()
    const end = performance.now()
    const duration = (end - start).toFixed(2)

    const status = c.res.status
    const statusColor = status >= 400 ? Color.red : Color.green
    const method = c.req.method
    const path = c.req.path

    // Local Console Log
    logger.info(
        `${Color.bold(method)} ${statusColor(status)} ${Color.gray(path)} ${Color.dim(duration + 'ms')}`
    )

    // Kirim Log Request ke Telegram Owner via Bot (non-blocking)
    if (path.startsWith('/api/')) {
        const ip = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'Unknown IP'
        const userAgent = c.req.header('user-agent') || 'Unknown Agent'
        const apiKey = c.req.query('apikey') || c.req.header('x-api-key') || 'None'
        const statusEmoji = status >= 200 && status < 300 ? '✅' : '❌'

        const teleMsg = `<b>🚨 API Request Log</b>
-------------------------------
<b>Status:</b> ${statusEmoji} ${status}
<b>Method:</b> <code>${method}</code>
<b>Path:</b> <code>${path}</code>
<b>API Key:</b> <code>${apiKey}</code>
<b>Latency:</b> ${duration}ms
<b>IP:</b> <code>${ip}</code>
<b>User-Agent:</b> <code>${userAgent}</code>`

        sendTelegramLog(teleMsg).catch(() => {})
    }
}
