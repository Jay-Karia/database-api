import { Context } from 'hono'

export const createStore = async (c: Context) => {
    return c.json({ message: "Store created" })
}