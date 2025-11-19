import crypto from "crypto";

export function createSignedHeaders() {
  const timestamp = Date.now().toString();
  const secret = process.env.NEXT_PUBLIC_FRONTEND_SECRET_KEY!;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(timestamp)
    .digest("hex");

  return {
    "x-timestamp": timestamp,
    "x-signature": signature,
  };
}
