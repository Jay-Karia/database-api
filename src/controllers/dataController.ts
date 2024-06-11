import { Context } from "hono";
import db from "../db"
import { getStore } from "../lib/storeLib";
import isValidKey from "../lib/isValidKey";
import getData from "../lib/getData";

const createData = async (c: Context) => {
    // @ts-ignore
    const { storeId, storeKey, value } = c.req.valid("json") as { storeId: string, storeKey: string, value: string };

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

        // add data to store
        const data = await db.data.create({
            data: {
                storeId,
                value
            },
        })

        return c.json({ message: "Data created successfully", data, store: { id: storeId, name: store.name } })

    } catch (e) {
        console.error(e)
        return c.json({ message: "Internal Server Error" }, 500)
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
            return c.json({ message: "Data not found" }, 400)
        }

        // check is the data entered is new
        if (value === data.value) {
            return c.json({ message: "Data is the same" }, 400)
        }

        // check if store key is valid
        if (!(await isValidKey(storeKey, data.store.storeKey))) {
            return c.json({ message: "Invalid store key" }, 400)
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

        return c.json({ message: "Data updated successfully" })
    } catch (e) {
        console.error(e)
        return c.json({ message: "Internal Server Error" }, 500
        )
    }
}

const specificData = async (c: Context) => {

    // @ts-ignore
    const { storeKey } = c.req.valid("json") as { storeKey: string };
    const dataId = c.req.param("id")
    const isDelete = c.req.query("delete")

    // get data
    const data = await getData(dataId)

    if (!data) {
        return c.json({ message: "Could not find data" }, 400)
    }

    // check if the store key is valid
    if (!(await isValidKey(storeKey, data.store.storeKey))) {
        return c.json({ message: "Invalid store key" }, 400)
    }

    // delete data
    if (isDelete === "true") {
        try {
            await db.data.delete({
                where: {
                    id: dataId
                }
            })
            return c.json({ message: "Data deleted successfully" })
        } catch (e) {
            console.error(e)
            return c.json({ message: "Internal Server Error" }, 500)
        }
    }


    return c.json({ message: "Data fetched successfully", data: { id: data.id, value: data.value, storeId: data.storeId }, store: { name: data.store.name, id: data.store.id } })
}

export { createData, updateData, specificData }