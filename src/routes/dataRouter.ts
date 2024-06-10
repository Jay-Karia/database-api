import { Hono } from "hono";
import { validator } from 'hono/validator'

import { createData } from "../controllers/dataController";

import dataSchema from "../schemas/dataSchema";
import { validate } from "../lib";

const dataRouter = new Hono()

// create data
dataRouter.post('/',validator('json', (value, c) => validate(value, c, dataSchema)), (c) => createData(c))
// read data
// update data
// delete data

export default dataRouter