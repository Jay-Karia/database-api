import { Hono } from 'hono'
import { validator } from 'hono/validator'

import { validate } from '../lib'
import { storeKeySchema, createStoreSchema } from '../schemas'
import { createStore, specificStore } from '../controllers/storeController'

const storeRouter = new Hono()

storeRouter.post('/', validator('json', (value, c) => validate(value, c, createStoreSchema)), async (c) => createStore(c))
storeRouter.post('/:id', validator('json', (value, c) => validate(value, c, storeKeySchema)), async (c) => specificStore(c))

export default storeRouter