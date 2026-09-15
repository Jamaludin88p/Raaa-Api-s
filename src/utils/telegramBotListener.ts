import { sendTelegramLog } from './telegramNotifier.js'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const OWNER_ID = process.env.TELEGRAM_OWNER_ID

let totalRequestsCount = 0
const startTime = Date.now()

export function incrementHitCount() {
    totalRequestsCount++
}

export function getHitStats() {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000)
    const hours = Math.floor(uptimeSeconds / 3600)
    const minutes = Math.floor((uptimeSeconds % 3600) / 60)
    const seconds = uptimeSeconds % 60
    return {
        totalHits: totalRequestsCount,
        uptime: `${hours}h ${minutes}m ${seconds}s`
    }
}

// Telegram Polling Bot for Owner Commands
async function pollTelegramUpdates() {
    let offset = 0
    console.log('[Telegram Bot] Listener started for owner commands...')

    while (true) {
        try {
            const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30`)
            if (res.ok) {
                const data = await res.json()
                if (data.ok && data.result) {
                    for (const update of data.result) {
                        offset = update.update_id + 1
                        const message = update.message
                        if (message && message.chat && String(message.chat.id) === String(OWNER_ID) && message.text) {
                            const command = message.text.trim()
                            if (command === '/stats' || command === '/status') {
                                const stats = getHitStats()
                                const replyMsg = `<b>📊 Kyzz APIs v2 Live Status</b>
-------------------------------
<b>Total API Hits:</b> <code>${stats.totalHits}</code>
<b>Server Uptime:</b> <code>${stats.uptime}</code>
<b>Status:</b> 🟢 ONLINE & Healthy`
                                await sendTelegramLog(replyMsg)
                            } else if (command === '/ping') {
                                await sendTelegramLog('🏓 <b>Pong!</b> Server Kyzz APIs v2 is active.')
                            }
                        }
                    }
                }
            }
        } catch (e) {
            // Polling error retry wait
            await new Promise(r => setTimeout(r, 5000))
        }
    }
}

// Start listener automatically
pollTelegramUpdates().catch(() => {})
