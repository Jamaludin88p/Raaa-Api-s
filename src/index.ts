import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import app from './app.js'
import logger from './utils/logger.ts'

app.get('/static/*', serveStatic({ root: './' }))
app.get('/docs', serveStatic({ path: './public/docs.html' }))
app.get('/', serveStatic({ path: './public/index.html' }))

const port = process.env.PORT || 3000
logger.ready(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
