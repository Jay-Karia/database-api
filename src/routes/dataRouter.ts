import { Hono } from "hono";
import { validator } from 'hono/validator'

import { createData, updateData } from "../controllers/dataController";
import { storeKeySchema, dataSchema, updateDataSchema } from "../schemas";

import { validate } from "../lib";

const dataRouter = new Hono()

// create data
dataRouter.post('/',validator('json', (value, c) => validate(value, c, dataSchema)), (c) => createData(c))
// read data
// update data
dataRouter.put('/:id', validator('json', (value, c) => validate(value, c, updateDataSchema)), (c) => updateData(c))
// delete data

export default dataRouter