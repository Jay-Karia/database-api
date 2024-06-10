import { Hono } from 'hono'
import { validator } from 'hono/validator'
import bcryptjs from 'bcryptjs'

import { checkDuplicateName, genStoreKey, isValidKey } from '../lib'
import { mutationSchema, querySchema } from '../schemas'

import db from "../db"

const storeRouter = new Hono()

// create store
storeRouter.post('/', validator('json', (value, c) => {
    const parsed = querySchema.safeParse(value)
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
    const parsed = mutationSchema.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Invalid!", status: 400 }, 400)
    }
    return parsed.data
}), async (c) => {

    const storeId = c.req.param("id")
    const { storeKey } = c.req.valid("json");
    const isDelete = c.req.query("delete")


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

        // delete the user
        if (isDelete) {
            try {
                await db.store.delete({
                    where: {
                        id: storeId
                    }
                })
                return c.json({ message: "Store deleted" })
            } catch {
                return c.json({ message: "Could not delete store" }, 400)
            }
        }

        return c.json({ message: "Store found", status: 200, store: { id: store.id, name: store.name } })

    } catch (error) {
        return c.json({ message: "Error getting store", status: 400 }, 400)
    }
})

export default storeRouter