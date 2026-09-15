import { sendTelegramLog } from './telegramNotifier.js'

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

/**
 * Dipanggil oleh route webhook (app/api di Hono) setiap kali Telegram
 * mengirim satu update. Menggantikan pollTelegramUpdates() versi lama
 * yang pakai while(true) getUpdates — model itu tidak bisa jalan di
 * Vercel Serverless karena function tidak boleh hidup selamanya.
 */
export async function handleTelegramUpdate(update: any) {
    try {
        const message = update?.message
        if (!message || !message.chat || !message.text) return

        // Hanya proses command dari OWNER_ID, abaikan chat lain
        if (String(message.chat.id) !== String(OWNER_ID)) return

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
    } catch {
        // Jangan biarkan error di sini menggagalkan response ke Telegram
    }
}                        const message = update.message
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
