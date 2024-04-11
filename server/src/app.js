import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authenticate } from "./utils/middlewares.js";
import { authRouter, userRouter, projectsRouter } from "./utils/routes.js";

const ROUTE_PREFIX = "/api/v1";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

app.use(ROUTE_PREFIX, projectsRouter);
app.use(ROUTE_PREFIX, authenticate, userRouter);
app.use(ROUTE_PREFIX, authRouter);
export default app;
