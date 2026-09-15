import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'

export const tiktokRoute = createRoute({
    method: 'get',
    path: '/api/downloader/tiktok',
    summary: 'TikTok Downloader',
    description: 'Download TikTok videos without watermark by providing a video URL.',
    tags: ['Downloader'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            url: z.string().openapi({
                example: 'https://vt.tiktok.com/ZSVDcGXTk/',
                description: 'TikTok Video URL'
            }),
            apikey: z.string().openapi({
                example: 'kyuzx',
                description: 'Valid API Key'
            })
        })
    },
    responses: {
        200: {
            description: 'TikTok video metadata and download links',
            content: {
                'application/json': {
                    schema: z.object({
                        status: z.boolean().openapi({ example: true }),
                        title: z.string().openapi({ example: 'TikTok Video Title' }),
                        duration: z.number().openapi({ example: 18 }),
                        author: z.object({
                            nickname: z.string(),
                            unique_id: z.string(),
                            avatar: z.string()
                        }),
                        video: z.object({
                            noWatermark: z.string(),
                            watermark: z.string(),
                            cover: z.string()
                        }),
                        music: z.object({
                            title: z.string(),
                            author: z.string(),
                            playUrl: z.string()
                        }),
                        stats: z.object({
                            views: z.number(),
                            likes: z.number(),
                            comments: z.number(),
                            shares: z.number()
                        })
                    })
                }
            }
        },
        400: {
            description: 'Missing or invalid URL parameter'
        },
        500: {
            description: 'Failed to fetch TikTok video'
        }
    }
})

export const tiktokHandler = async (c: Context) => {
    const videoUrl = c.req.query('url')
    if (!videoUrl) {
        return c.json({ status: false, error: 'Query parameter "url" is required' }, 400)
    }

    try {
        const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        })

        if (!res.ok) {
            return c.json({ status: false, error: `TikWM API Error: ${res.statusText}` }, 500)
        }

        const data = await res.json()
        if (data.code !== 0 || !data.data) {
            return c.json({ status: false, error: data.msg || 'Failed to fetch TikTok video data' }, 500)
        }

        const info = data.data
        return c.json({
            status: true,
            title: info.title || '',
            duration: info.duration || 0,
            author: {
                nickname: info.author?.nickname || '',
                unique_id: info.author?.unique_id || '',
                avatar: info.author?.avatar || ''
            },
            video: {
                noWatermark: info.play || '',
                watermark: info.wmplay || '',
                cover: info.cover || ''
            },
            music: {
                title: info.music_info?.title || '',
                author: info.music_info?.author || '',
                playUrl: info.music || ''
            },
            stats: {
                views: info.play_count || 0,
                likes: info.digg_count || 0,
                comments: info.comment_count || 0,
                shares: info.share_count || 0
            }
        }, 200)
    } catch (err) {
        return c.json({ status: false, error: err.message || 'Internal Server Error' }, 500)
    }
}
