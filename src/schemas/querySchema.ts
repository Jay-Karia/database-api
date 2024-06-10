import { z } from 'zod'

const querySchema = z.object({
    name: z.string(),
})

export default querySchema