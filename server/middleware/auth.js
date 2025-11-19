const crypto = require("crypto");

function verifyFrontendSignature(req, res, next) {
  const signature = req.headers["x-signature"];
  const timestamp = req.headers["x-timestamp"];

  if (!signature || !timestamp) {
    return res.status(401).json({ success: false, message: "Missing signature" });
  }

  const now = Date.now();
  if (Math.abs(now - parseInt(timestamp)) > 5 * 60 * 1000) {
    return res.status(401).json({ success: false, message: "Timestamp expired" });
  }

  const expected = crypto
    .createHmac("sha256", process.env.FRONTEND_SECRET_KEY)
    .update(timestamp.toString())
    .digest("hex");

  if (expected !== signature) {
    return res.status(403).json({ success: false, message: "Invalid signature" });
  }

  next();
}

module.exports = { verifyFrontendSignature };
