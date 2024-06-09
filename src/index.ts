import { Hono } from 'hono'
import connectDB from "./config/db"

const app = new Hono()

app.get('/', (c) => {
  connectDB()
  return c.text('Hello Hono!')
})

export default app
