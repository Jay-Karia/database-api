import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

import { storeRouter, dataRouter } from './routes'

const app = new Hono()

const token = process.env.BEARER_TOKEN || ""

app.use('/api/*', bearerAuth({ token }))

app.route('/api/store', storeRouter)
app.route('/api/data', dataRouter)

app.get('/', (c) => {
  return c.text("Hello world")
})

export default app
