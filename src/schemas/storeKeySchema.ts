import { z } from 'zod'

const storeKeySchema = z.object({
    storeKey: z.string(),
})

export default storeKeySchema