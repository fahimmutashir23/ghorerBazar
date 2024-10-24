const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
var Address6 = require("ip-address").Address6;

const VisitSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
});
const Visit = mongoose.model("Visit", VisitSchema);

router.get("/get-ip", async (req, res) => {
  const address = new Address6("2001:0:ce49:7601:e866:efff:62c3:fffe");
  const teredo = address.inspectTeredo();
  const ip = teredo.client4;
  const userAgent = req.headers["user-agent"];

  // Save IP address and user agent to the database
  console.log(ip);
  const visit = new Visit({ ip, userAgent });
  //   const result = await visit.save();
  //   res.json({
  //     deviceIp: req.ip,
  //   });
});

module.exports = router;
