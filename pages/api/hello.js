//import connection from "../../config/db.js";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT,
    // database: process.env.DB_NAME,

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: "test_db",
  });

  try {
    const query = "SELECT full_name FROM usertbl";
    const values = [];
    const [data] = await connection.execute(query, values);
    connection.end();
    res.status(200).json({ results: data });
  } catch (error) {
    // res.status(200).json({ results: data });
  }
}

// import { pool } from "../../config/db.js";

// export default function handler(req, res) {
//   // const result = pool.query("SELECT NOW()");
//   const result = "hola";
//   console.log(result);
//   return <div>TEST: {result}</div>;
// }
