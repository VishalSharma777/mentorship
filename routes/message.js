const express = require("express");
const {
  sendMessage,
  inboxMessages,
  getAllMessages,
} = require("../controllers/message");
const { verifyJWT } = require("../middleware/verify");
const router = express.Router();

router.post("/send/:receiverId", verifyJWT, sendMessage);

router.get("/inbox", verifyJWT, inboxMessages);
router.get("/allMessages", getAllMessages);

module.exports = router;
