import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { getCustomNewsHandler } from "../../../../modules/news/handlers/getCustomNewsHandler.js"

const newsRoutes = Router()

newsRouter.post("/", getCustomNewsHandler)

export { newsRoutes }