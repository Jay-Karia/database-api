import { Context } from "hono";
import db from "../db"

const createData = async (c: Context) => {
     // @ts-ignore
     const { storeId, storeKey, value } = c.req.valid("json") as { storeId: string, storeKey: string, value: string};

     // get store

     // check if store key is valid

     // add data to store

    return c.json({ message: "Create Data" })
}

// ... other CRUD operations

export { createData }