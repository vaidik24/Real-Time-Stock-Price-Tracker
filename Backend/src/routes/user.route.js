import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.contollers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);
// userRoutes.route("/user/profile").get(verifyJWT, getCurrentUser);
userRoutes.route("/logout").post(logoutUser);
userRoutes.route("/refreshtoken").post(refreshAccessToken);
export { userRoutes };
