const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //we can use multiple referece
  //   mentor: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Mentor", // Reference to the Mentor model
  //   },

  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
