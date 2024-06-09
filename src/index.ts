import { Hono } from 'hono'
import connectDB from "./config/db"
import { bearerAuth } from 'hono/bearer-auth'

const app = new Hono()

const token = Bun.env.BEARER_TOKEN || ""

app.use('/api/*', bearerAuth({ token }))

app.get('/', (c) => {
  connectDB()
  return c.text("Hello world")
})

app.get('/api/page', (c) => {
  return c.json({ message: 'You are authorized' })
})

export default app
