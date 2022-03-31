import "express-async-errors";

import express, { json } from "express";
import cors from "cors"
import { errors } from "celebrate";


import routes from "./routes/index.js";
import { errorHandler } from "../../middlewares/errorHandler.js";


const app = express();

app.use(cors())
app.use(json());
app.use(routes);
app.use(errorHandler)


export default app;
