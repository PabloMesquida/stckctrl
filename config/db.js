import mysql from "mysql2/promise";

export async function executeQuery({ query, values = [] }) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });

  try {
    const [results] = await db.execute(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
