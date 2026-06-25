import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", routes);

export default app;