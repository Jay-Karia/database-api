import { Context } from 'hono'
import db from "../db"

export const getStore = async (c: Context) => {
    const storeId = c.req.param("id")
    return c.json({ message: "Store found" })
}

export const updateStore = async (c: Context) => {
    return c.json({ message: "Store updated" })
}

export const deleteStore = async (c: Context) => {
    return c.json({ message: "Store deleted" })
}