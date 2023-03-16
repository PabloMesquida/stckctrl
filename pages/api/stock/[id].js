import { executeQuery } from "@/config/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return res.status(200).json("Create product");
  } else {
    return res.status(200).json("get product");
  }
}
