import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(

  "/uploads",

  express.static(

    path.join(

      process.cwd(),

      process.env.UPLOAD_PATH || "uploads"

    )

  )

);

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", routes);

export default app;