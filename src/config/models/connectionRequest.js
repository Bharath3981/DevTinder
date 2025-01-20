const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} not a valid status",
      },
      required: true,
      default: "ignore",
    },
  },
  { timestamps: true }
);

// Indexing the sender and receiver fields
connectionRequestSchema.index({ sender: 1, receiver: 1 });

// Check if the user is trying to send request to himself
connectionRequestSchema.pre("save", async function (next) {
  const request = this;
  //Check if the user is trying to send request to himself
  if (request.sender === request.receiver) {
    throw new Error("You can't send request to yourself");
  }
  next();
});

/**
 * Check if the user is trying to send request to same user again
 */
const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
