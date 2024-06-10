import { Context } from "hono"
import { mutationSchema, querySchema } from "../schemas"

type SchemaType = typeof querySchema | typeof mutationSchema

const validate = (value : any, c : Context, schema : SchemaType) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Invalid!", status: 400 }, 400)
    }
    return parsed.data
}

export default validate