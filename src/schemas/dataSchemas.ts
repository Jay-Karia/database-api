import { z } from "zod"

const dataSchema = z.object({
    storeId: z.string(),
    storeKey: z.string(),
    value: z.string(),
})

const updateDataSchema = z.object({
    storeKey: z.string(),
    value: z.string(),
})

export { dataSchema, updateDataSchema }