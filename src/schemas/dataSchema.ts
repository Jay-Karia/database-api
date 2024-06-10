import { z } from "zod"

const dataSchema = z.object({
    storeId: z.string(),
    storeKey: z.string(),
    value: z.string(),
})

export default dataSchema