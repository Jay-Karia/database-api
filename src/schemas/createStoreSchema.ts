import { z } from 'zod'

const createStoreSchema = z.object({
    name: z.string(),
})

export default createStoreSchema