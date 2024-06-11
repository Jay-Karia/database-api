import { Context } from "hono";
import bcryptjs from 'bcryptjs'

import db from "../db";
import { checkDuplicateName, genStoreKey, getStore } from "../lib/storeLib";
import isValidKey from "../lib/isValidKey";

const createStore = async (c: Context) => {
    // @ts-ignore
    const { name } = c.req.valid("json") as { name: string; };

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
}

const specificStore = async (c: Context) => {
    const storeId = c.req.param("id")
    // @ts-ignore
    const { storeKey } = c.req.valid("json") as { storeKey: string };
    const isDelete = c.req.query("delete")


    try {

        // get store
        const store = await getStore(storeId)

        if (!store) {
            return c.json({ message: "Store not found" }, 400)
        }

        // check if store key is valid
        if (!(await isValidKey(storeKey, store.storeKey))) {
            return c.json({ message: "Invalid store key" }, 400)
        }

        // delete the store
        if (isDelete === "true") {
            // try {
                await db.store.delete({
                    where: {
                        id: storeId
                    }
                })
                return c.json({ message: "Store deleted" })
            // } catch {
            //     return c.json({ message: "Could not delete store" }, 400)
            // }
        }

        return c.json({ message: "Store found", status: 200, store: { id: store.id, name: store.name, data: store.data } })

    } catch (error) {
        return c.json({ message: "Error getting store", status: 400 }, 400)
    }
}

export { createStore, specificStore }