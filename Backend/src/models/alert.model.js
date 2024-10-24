import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stock: {
      type: String,
      required: true,
      uppercase: true,
    },
    targetPrice: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["ABOVE", "BELOW"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    triggered: {
      type: Boolean,
      default: false,
    },
    lastChecked: Date,
  },
  {
    timestamps: true,
  }
);

export const Alert = mongoose.model("Alert", alertSchema);
