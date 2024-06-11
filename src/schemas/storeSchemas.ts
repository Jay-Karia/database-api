import { z } from 'zod'

const createStoreSchema = z.object({
    name: z.string(),
})

const storeKeySchema = z.object({
    storeKey: z.string(),
})

export { createStoreSchema, storeKeySchema }