const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const OWNER_ID = process.env.TELEGRAM_OWNER_ID

export async function sendTelegramLog(message) {
    if (!BOT_TOKEN || !OWNER_ID) return

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: OWNER_ID,
                text: message,
                parse_mode: 'HTML'
            })
        })
    } catch (err) {
        // Silently ignore telegram log errors to not interrupt API execution
    }
}
