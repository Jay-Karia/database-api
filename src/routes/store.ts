import { Hono } from 'hono'
import { validator } from 'hono/validator'

import { validate } from '../lib'
import { mutationSchema, querySchema } from '../schemas'
import { createStore, specificStore } from '../controllers/storeController'

const storeRouter = new Hono()

storeRouter.post('/', validator('json', (value, c) => validate(value, c, querySchema)), async (c) => createStore(c))
storeRouter.post('/:id', validator('json', (value, c) => validate(value, c, mutationSchema)), async (c) => specificStore(c))

export default storeRouter