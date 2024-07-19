import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { user_router, projects_router, auth_router } from "./routes/routes.js";
import { authenticate } from "./middleware/auth.js";

const ROUTE_PREFIX = "/api/v1";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:3000", "http://localhost:4321"],
		credentials: true,
	}),
);

app.use(ROUTE_PREFIX + "/auth", auth_router);
app.use(ROUTE_PREFIX, authenticate, projects_router);
app.use(ROUTE_PREFIX, user_router);

export default app;
