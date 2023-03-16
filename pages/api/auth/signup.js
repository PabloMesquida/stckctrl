import { executeQuery } from "@/config/db";
import {
  BAD_REQUEST,
  HTTP_METHOD_NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
  SUCCESS,
  UNPROCESSABLE_ENTITY,
} from "@/status";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(HTTP_METHOD_NOT_ALLOWED).json({
        message: "HTTP method not valid only POST accepted",
      });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Username, email and password are required." });
    }

    const data = await executeQuery({
      query: `SELECT * FROM usertbl WHERE email = "${email}"`,
      values: [],
    });

    if (data.length) {
      return res
        .status(UNPROCESSABLE_ENTITY)
        .json({ message: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 5);
    const results = await executeQuery({
      query: `INSERT INTO usertbl(name, email, password) VALUES(?, ?, ?)`,
      values: [username, email, passwordHash],
    });

    if (results) {
      return res.status(SUCCESS).json({ status: true, user: results });
    } else {
      return res.status(BAD_REQUEST).json({ message: "Error" });
    }
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}
