import "dotenv/config";
import { isProd } from "~/utils/constants";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authMiddleware from "~/middlewares/auth.middleware";
import privateRouter from "~/routes/_private.route";
import publicRouter from "~/routes/_public.route";

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: isProd ? process.env.ORIGIN : "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  }),
);
app.use(publicRouter);
app.use(authMiddleware);
app.use(privateRouter);

app.listen(PORT, () => {
  console.log(
    isProd
      ? `Server is running on port ${PORT}`
      : `Server is running on http://localhost:${PORT}`,
  );
});
