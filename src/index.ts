import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

import storeRouter from './routes/store'

const app = new Hono()

const token = Bun.env.BEARER_TOKEN || ""

app.use('/api/*', bearerAuth({ token }))

app.route('/api/store', storeRouter)

app.get('/', (c) => {
  return c.text("Hello world")
})

export default app
