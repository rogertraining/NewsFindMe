import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { getCustomNewsHandler } from "../../../../modules/news/handlers/getCustomNewsHandler.js"

const newsRouter = Router()

newsRouter.post("/", getCustomNewsHandler)

export { newsRouter }