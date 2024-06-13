import { Context } from "hono";
import bcryptjs from 'bcryptjs'

import db from "../db";
import { checkDuplicateName, genStoreKey, getStore } from "../lib/storeLib";
import isValidKey from "../lib/isValidKey";

import { INTERNAL_SERVER_ERROR, INVALID_STORE_KEY, STORE_NOT_FOUND } from "../constants";

const createStore = async (c: Context) => {
    // @ts-ignore
    const { name } = c.req.valid("json") as { name: string; };

    try {

        // check duplicate name
        if (await checkDuplicateName(name)) {
            return c.json({ message: "Store already exists! Try using different name", success: false }, 400)
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

        return c.json({ message: "Store created!", success: true, storeKey, storeId: newStore.id })
    } catch (e) {
        console.error(e)
        return c.json(INTERNAL_SERVER_ERROR, 500)
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
            return c.json(STORE_NOT_FOUND, 400)
        }

        // check if store key is valid
        if (!(await isValidKey(storeKey, store.storeKey))) {
            return c.json(INVALID_STORE_KEY, 400)
        }

        // delete the store
        if (isDelete === "true") {
            try {
                await db.store.delete({
                    where: {
                        id: storeId
                    }
                })
                return c.json({ message: "Store deleted!", success: true })
            } catch {
                return c.json({ message: "Could not delete store!", success: false }, 400)
            }
        }

        // filtered store data
        const filterStore = { id: store.id, name: store.name, data: store.data }

        return c.json({ message: "Store found!", success: true, store: filterStore })

    } catch (e) {
        console.error(e);
        return c.json(INTERNAL_SERVER_ERROR, 500)
    }
}

export { createStore, specificStore }