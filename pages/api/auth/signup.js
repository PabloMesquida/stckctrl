import { executeQuery } from "@/config/db";
import { hash } from "bcryptjs";

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

    const passwordHash = await hash(password, 12);
    const restultsCreate = await executeQuery({
      query: `INSERT INTO usertbl(username, email, password) VALUES(?, ?, ?)`,
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
