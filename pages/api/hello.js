import { pool } from "../../config/db.js";

export default function handler(req, res) {
  const result = pool.query("SELECT NOW()");

  console.log(result);
  res.status(200).json({ name: "John Doe" });
}
