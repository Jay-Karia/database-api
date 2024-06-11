import { Hono } from "hono";
import { validator } from 'hono/validator'

import { createData, updateData, specificData } from "../controllers/dataController";
import { dataSchema, updateDataSchema } from "../schemas/dataSchemas";

import validate from "../lib/validate";
import { storeKeySchema } from "../schemas/storeSchemas";

const dataRouter = new Hono()

dataRouter.post('/',validator('json', (value, c) => validate(value, c, dataSchema)), (c) => createData(c))
dataRouter.put('/:id', validator('json', (value, c) => validate(value, c, updateDataSchema)), (c) => updateData(c))
dataRouter.post("/:id", validator('json', (value, c) => validate(value, c, storeKeySchema)), (c)=> specificData(c))

export default dataRouter