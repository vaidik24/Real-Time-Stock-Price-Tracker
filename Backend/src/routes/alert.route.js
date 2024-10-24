import { Router } from "express";
import {
  createAlert,
  deleteAlert,
  sendNotifications,
} from "../controllers/alert.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const alertRoutes = Router();

// alertRoutes.use(verifyJWT);

alertRoutes.route("/create").post(createAlert);
alertRoutes.route("/delete/:id").delete(deleteAlert);
alertRoutes.route("/sendnotifications").post(sendNotifications);

export { alertRoutes };
