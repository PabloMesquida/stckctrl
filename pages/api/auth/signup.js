import { executeQuery } from "@/config/db";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data" });

    const { username, email, password } = req.body;

    // Check duplicate users
    const data = await executeQuery({
      query: `SELECT * FROM usertbl WHERE email = "${email}"`,
      value: [],
    });

    if (data.length)
      return res.status(422).json({ message: "User alaready exist." });

    const passwordHash = await bcrypt.hash(password, 5);
    const restultsCreate = await executeQuery({
      query: `INSERT INTO usertbl(name, email, password) VALUES(?, ?, ?)`,
      values: [username, email, passwordHash],
    });

    if (restultsCreate) {
      return res.status(200).json({ status: true, user: restultsCreate });
    } else {
      return res.status(404).json({ message: "Error" });
    }
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted" });
  }
}
