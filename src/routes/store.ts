import { Hono } from 'hono'
import { z } from 'zod'
import db from "../db"
import { validator } from 'hono/validator'
import genStoreKey from '../lib/genStoreKey'
import checkDuplicateName from '../lib/checkDuplicateName'
import bcryptjs from 'bcryptjs'
import isValidKey from '../lib/isValidKey'

const storeRouter = new Hono()

// create store
storeRouter.post('/', validator('json', (value, c) => {
    const schema = z.object({
        name: z.string(),
    })
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Invalid!", status: 400 }, 400)
    }
    return parsed.data
}), async (c) => {

    const { name } = c.req.valid("json");

    try {

        // check duplicate name
        if (await checkDuplicateName(name)) {
            return c.json({ message: "Store name already exists" })
        }

        // gen store key
        const storeKey = genStoreKey()
        const hashedStoreKey = bcryptjs.hashSync(storeKey, 10)

        // create store object
        const store = {
            name,
            storeKey: hashedStoreKey
        }

        // save in database
        const newStore = await db.store.create({
            data: store
        })
        return c.json({ message: "Store created", status: 200, storeKey, storeId: newStore.id })
    } catch (error) {
        return c.json({ message: "Error creating store" })
    }

})

// get specific store
storeRouter.post('/:id', validator('json', (value, c) => {
    const schema = z.object({
        storeKey: z.string(),
    })
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Invalid!", status: 400 }, 400)
    }
    return parsed.data
}), async (c) => {

    const storeId = c.req.param("id")
    const { storeKey } = c.req.valid("json");

    try {

        // get store
        const store = await db.store.findUnique({
            where: {
                id: storeId
            }
        })

        if (!store) {
            return c.json({ message: "Store not found" }, 400)
        }

        // check if store key is valid
        if (!(await isValidKey(storeKey, store.storeKey))) {
            return c.json({ message: "Invalid store key" }, 400)
        }

        return c.json({ message: "Store found", status: 200, store: { id: store.id, name: store.name } })

    } catch (error) {
        return c.json({ message: "Error getting store", status: 400 }, 400)
    }
})

// delete store
storeRouter.delete('/:id', validator('json', (value, c) => {
    const schema = z.object({
        storeKey: z.string(),
    })
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Invalid!", status: 400 }, 400)
    }
    return parsed.data
}), async (c) => {

    const storeId = c.req.param("id")
    const { storeKey } = c.req.valid("json");

    try {

        // get store
        const store = await db.store.findUnique({
            where: {
                id: storeId
            }
        })

        if (!store) {
            return c.json({ message: "Store not found" }, 400)
        }

        // check if store key is valid
        if (!(await isValidKey(storeKey, store.storeKey))) {
            return c.json({ message: "Invalid store key" }, 400)
        }

        // delete store
        await db.store.delete({
            where: {
                id: storeId
            }
        })

        return c.json({ message: "Store Deleted", status: 200})

    } catch (error) {
        return c.json({ message: "Error deleting store", status: 400 }, 400)
    }
})

export default storeRouter