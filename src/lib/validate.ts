import { Context } from "hono"
import { createStoreSchema, storeKeySchema } from "../schemas/storeSchemas"
import { dataSchema } from "../schemas/dataSchemas"

type SchemaType = typeof createStoreSchema | typeof storeKeySchema | typeof dataSchema

const validate = (value : any, c : Context, schema : SchemaType) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Invalid!", status: 400 }, 400)
    }
    return parsed.data
}

export default validate