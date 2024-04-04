import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./models/user.js";

// import { authenticate, authorize } from "./utils/middlewares.js";
// import { publicRouter, authRouter, userRouter } from "./utils/routes.js";

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

app.post("/api/v1/signup", (req, res) => {
  const newUser = new user(req.body);
  newUser
    .save()
    .then(() => res.send("User added"))
    .catch((err) => res.status(400).json({ message: err }));
});

// app.use(ROUTE_PREFIX, publicRouter);
// app.use(ROUTE_PREFIX, authRouter);
// app.use(ROUTE_PREFIX + "/user", authenticate, authorize, userRouter);

export default app;
