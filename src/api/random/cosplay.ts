import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'

const PASTEBIN_URL = 'https://pastebin.com/raw/TsJiH5d8'
let imageCache: string[] = []
let lastFetch = 0
const CACHE_TTL = 10 * 60 * 1000 // Cache 10 menit

async function getCosplayImages(): Promise<string[]> {
    const now = Date.now()
    if (imageCache.length > 0 && (now - lastFetch) < CACHE_TTL) {
        return imageCache
    }

    const res = await fetch(PASTEBIN_URL)
    if (!res.ok) {
        throw new Error(`Failed to fetch image list: ${res.statusText}`)
    }
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
        imageCache = data
        lastFetch = now
    }
    return imageCache
}

export const cosplayRoute = createRoute({
    method: 'get',
    path: '/api/random/cosplay',
    summary: 'Random Cosplay Image',
    description: 'Returns a random cosplay image directly as binary stream (image/jpeg)',
    tags: ['Random'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            apikey: z.string().openapi({
                example: 'kyuzx',
                description: 'Valid API Key'
            })
        })
    },
    responses: {
        200: {
            description: 'Binary Image Stream',
            content: {
                'image/jpeg': {
                    schema: z.string().openapi({ format: 'binary' })
                }
            }
        },
        500: {
            description: 'Failed to fetch image'
        }
    }
})

export const cosplayHandler = async (c: Context) => {
    try {
        const images = await getCosplayImages()
        if (!images || images.length === 0) {
            return c.json({ error: 'No images available' }, 500)
        }

        const randomUrl = images[Math.floor(Math.random() * images.length)]
        const imgRes = await fetch(randomUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        })

        if (!imgRes.ok) {
            return c.json({ error: 'Failed to fetch target image' }, 500)
        }

        const contentType = imgRes.headers.get('content-type') || 'image/jpeg'
        const arrayBuffer = await imgRes.arrayBuffer()

        c.header('Content-Type', contentType)
        c.header('Cache-Control', 'no-cache, no-store, must-revalidate')
        return c.body(arrayBuffer)
    } catch (err) {
        return c.json({ error: err.message || 'Internal Server Error' }, 500)
    }
}
