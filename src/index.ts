import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

import storeRouter from './routes/storeRouter'
import dataRouter from './routes/dataRouter'

const app = new Hono()

const token = Bun.env.BEARER_TOKEN || ""

app.use('/api/*', bearerAuth({ token }))

app.route('/api/store', storeRouter)
app.route('/api/data', dataRouter)

app.get('/', (c) => {
  return c.html('<h1>🗄 Welcome to Database API</h1><h3>View the documentation <a href="https://github.com/Jay-Karia/database-api/blob/main/DOCUMENTATION.md" target="_blank">here</a></h3>')
})

export default app
