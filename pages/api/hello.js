import { pool } from "../../config/db.js";

export default function handler(req, res) {
  const result = pool.query("SELECT NOW()");

  console.log(result);
  return <div>TEST: {result}</div>;
}
