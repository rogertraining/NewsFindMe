import "express-async-errors";

import express, { json } from "express";

import routes from "./routes/index.js";
import { errorHandler } from "../../middlewares/errorHandler.js";


const app = express();

app.use(json());
app.use(routes);
app.use(errorHandler)

export default app;
