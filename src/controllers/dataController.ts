import { Context } from "hono";
import db from "../db"
import { getStore } from "../lib/storeLib";
import isValidKey from "../lib/isValidKey";
import getData from "../lib/getData";

import { INTERNAL_SERVER_ERROR, INVALID_STORE_KEY, STORE_NOT_FOUND } from "../constants";

const createData = async (c: Context) => {
    // @ts-ignore
    const { storeId, storeKey, value } = c.req.valid("json") as { storeId: string, storeKey: string, value: string };

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

        // add data to store
        const data = await db.data.create({
            data: {
                storeId,
                value
            },
        })

        // filtered store data
        const filterStore = { id: storeId, name: store.name }

        return c.json({ message: "Data created successfully", data, store: filterStore })

    } catch (e) {
        console.error(e)
        return c.json(INTERNAL_SERVER_ERROR, 500)
    }
}

const updateData = async (c: Context) => {

    // @ts-ignore
    const { storeKey, value } = c.req.valid("json") as { storeKey: string, value: string };
    const dataId = c.req.param("id")

    try {

        // get data
        const data = await getData(dataId)

        if (!data) {
            return c.json({ message: "Data not found", success: false }, 400)
        }

        // check is the data entered is new
        if (value === data.value) {
            return c.json({ message: "Data is same", success: false }, 400)
        }

        // check if store key is valid
        if (!(await isValidKey(storeKey, data.store.storeKey))) {
            return c.json(INVALID_STORE_KEY, 400)
        }

        // update data
        await db.data.update({
            where: {
                id: dataId
            },
            data: {
                value
            }
        })

        // filtered data
        const filterData = { id: data.id, value: data.value }
        const filterStore = { name: data.store.name, id: data.store.id }

        return c.json({ message: "Data updated successfully", success: true, data: filterData, store: filterStore })
    } catch (e) {
        console.error(e)
        return c.json(INTERNAL_SERVER_ERROR, 500)
    }
}

const specificData = async (c: Context) => {

    // @ts-ignore
    const { storeKey } = c.req.valid("json") as { storeKey: string };
    const dataId = c.req.param("id")
    const isDelete = c.req.query("delete")

    try {

        // get data
        const data = await getData(dataId)

        if (!data) {
            return c.json({ message: "Could not find data", success: false }, 400)
        }

        // check if the store key is valid
        if (!(await isValidKey(storeKey, data.store.storeKey))) {
            return c.json(INVALID_STORE_KEY, 400)
        }

        // delete data
        if (isDelete === "true") {
            try {
                await db.data.delete({
                    where: {
                        id: dataId
                    }
                })
                return c.json({ message: "Data deleted successfully", success: true })
            } catch (e) {
                console.error(e)
                return c.json(INTERNAL_SERVER_ERROR, 500)
            }
        }

        // filtered data
        const filterData = { id: data.id, value: data.value }
        const filterStore = { name: data.store.name, id: data.store.id }

        return c.json({ message: "Data fetched successfully", success: true, data: filterData, store: filterStore })

    } catch (e) {
        console.error(e)
        return c.json(INTERNAL_SERVER_ERROR, 500)
    }


}

export { createData, updateData, specificData }