import { Router } from "express";
import {
  getWatchlist,
  addStock,
  removeStock,
  createWatchlist,
  deleteWatchlist,
} from "../controllers/watchlist.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const watchlistRoutes = Router();

// Apply JWT verification middleware to all routes
watchlistRoutes.use(verifyJWT);

// Route to create a new watchlist
watchlistRoutes.route("/create").post(createWatchlist);

// Route to get the user's watchlist
watchlistRoutes.route("/").get(getWatchlist);

// Route to add a stock to the watchlist
watchlistRoutes.route("/addstock").post(addStock);

// Route to remove a stock from the watchlist
watchlistRoutes.route("/removestock").post(removeStock);

// Route to delete the watchlist
watchlistRoutes.route("/delete").delete(deleteWatchlist);

export { watchlistRoutes };
