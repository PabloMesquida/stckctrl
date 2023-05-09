import mysql from "mysql2/promise";

let db;

export async function executeQuery({ query, values = [] }) {
  if (!db) {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    });
  }

  try {
    const [results] = await db.execute(query, values);
    return results;
  } catch (error) {
    return { error };
  }
}

export { db };
