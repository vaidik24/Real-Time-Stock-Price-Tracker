import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRoutes } from "./routes/user.route.js";
import { watchlistRoutes } from "./routes/watchlist.route.js";
import { stockRoutes } from "./routes/stocks.route.js";
import { alertRoutes } from "./routes/alert.route.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/user", userRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/stocks", stockRoutes); 
app.use("/alert", alertRoutes);

export { app };

