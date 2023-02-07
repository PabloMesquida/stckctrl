import { excuteQuery } from "../../config/db.js";

export default async function handler(req, res) {
  try {
    const query = "SELECT full_name FROM usertbl";
    const values = [];
    const [data] = await excuteQuery({ query, values });
    res.status(200).json({ results: data });
  } catch (error) {
    console.log(error);
  }
}
