import "express-async-errors";

import express, { json } from "express";

import routes from "./routes/index.js";
import { errorHandler } from "../../middlewares/errorHandler.js";

import knexClient from "../database/knex-client.js";

const app = express();

app.use(json());
app.use(routes);
app.use(errorHandler)

app.get("/", )

export default app;
