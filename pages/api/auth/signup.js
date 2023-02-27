import { executeQuery } from "@/config/db";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data" });

    const { username, email, password } = req.body;

    // Check duplicate users
    const query = `SELECT * FROM usertbl WHERE email = "${email}"`;
    const values = "";
    const data = await executeQuery({ query, values });

    if (data.length > 0) {
      return res.status(422).json({ message: "User alaready exist." });
    }

    return res.status(200).json({ results: data });

    // // Hash password
    // const passwordHash = await hash(password, 12);
    // const queryCreate = `INSERT INTO usertbl (username, email, password) VALUES (?, ?, ?)`;
    // const restultsCreate = await executeQuery(queryCreate, [
    //   username,
    //   email,
    //   passwordHash,
    // ]);
    // console.log("r", restultsCreate);
    // return res.status(200).json({ status: true });
  } else {
    res
      .status(500)
      .json({ message: "HTTP method not valid only POST accepted" });
  }
}
