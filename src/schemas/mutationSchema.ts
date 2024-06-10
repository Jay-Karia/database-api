import { z } from 'zod'

const mutationSchema = z.object({
    storeKey: z.string(),
})

export default mutationSchema