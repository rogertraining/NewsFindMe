import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import { getCustomNewsHandler } from "../../../../modules/news/handlers/getCustomNewsHandler.js"

const newsRoutes = Router()

newsRoutes.post("/", getCustomNewsHandler)

export { newsRoutes }