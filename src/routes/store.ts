import { Hono } from 'hono'
import { createStore } from '../controllers/storeController'

const storeRouter = new Hono()

// create a store
storeRouter.post('/', (c) => createStore(c))

export default storeRouter