import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["health", "car", "life"],
      required: true,
    },

    premiumAmount: {
      type: Number,
      required: true,
    },

    coverageAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);

export default Policy;