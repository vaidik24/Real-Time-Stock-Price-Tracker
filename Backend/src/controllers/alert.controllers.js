import { Alert } from "../models/alert.model.js";
import { sendEmail } from "../services/nodeMailer.service.js";
import { sendSMS } from "../services/twilio.service.js";
import { ApiError } from "../utils/apiError.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

const createAlert = asyncHandler(async (req, res) => {
  const { stock, targetPrice, condition } = req.body;

  console.log(req.body)
  if (!stock || !targetPrice || !condition) {
    throw new ApiError(400, "Stock, target price, and condition are required");
  }

  try {
    const alert = new Alert({
      // user: req.body.userId, // Assuming userId is provided in the request body
      stock: stock.toUpperCase(),
      targetPrice,
      condition,
    });

    await alert.save();

    return res
      .status(201)
      .json(new ApiResponse(201, alert, "Alert successfully created"));
  } catch (error) {
    throw new ApiError(500, `Failed to create alert: ${error.message}`);
  }
});

const deleteAlert = asyncHandler(async (req, res) => {
  const alertId = req.params.id;

  if (!alertId) {
    throw new ApiError(400, "Alert ID is required");
  }

  try {
    const deletedAlert = await Alert.findByIdAndDelete(alertId);

    if (!deletedAlert) {
      throw new ApiError(404, "Alert not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Alert deleted successfully"));
  } catch (error) {
    throw new ApiError(500, `Failed to delete alert: ${error.message}`);
  }
});

const sendNotifications = asyncHandler(async (req, res) => {
  const { stock, currentPrice } = req.body;
  if (!stock || !currentPrice) {
    throw new ApiError(400, "Stock symbol and current price are required");
  }

  try {
    const alerts = await Alert.find({
      stock: stock.toUpperCase(),
      active: true,
      triggered: false,
    }).populate("user", "email phoneNumber");

    if (alerts.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "No active alerts for this stock"));
    }

    console.log(`alerts: ${alerts}`);

    const notifications = alerts.map(async (alert) => {
      let shouldNotify = false;

      if (
        (alert.condition === "ABOVE" && currentPrice > alert.targetPrice) ||
        (alert.condition === "BELOW" && currentPrice < alert.targetPrice)
      ) {
        shouldNotify = true;
      }

      if (shouldNotify) {
        const smsMessage = `Alert: ${alert.stock} has ${alert.condition === "ABOVE" ? "exceeded" : "dropped below"} your target price of $${alert.targetPrice}. Current price: $${currentPrice}`;
        await sendSMS(smsMessage, alert.user.phoneNumber);

        const emailSubject = `Stock Alert: ${alert.stock} ${alert.condition === "ABOVE" ? "Above" : "Below"} Target Price`;
        await sendEmail(alert.user.email, emailSubject);

        alert.triggered = true;
        alert.lastChecked = new Date();
        await alert.save();
      }
    });

    await Promise.all(notifications);

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Notifications sent successfully"));
  } catch (error) {
    throw new ApiError(500, `Failed to send notifications: ${error.message}`);
  }
});

export { createAlert, deleteAlert, sendNotifications };
