import mysql from "mysql2/promise";

let pool;

export async function executeQuery({ query, values = [] }) {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      connectionLimit: 200, // Establece el número máximo de conexiones en el grupo
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    return { error };
  } finally {
    if (connection) {
      connection.release(); // Libera la conexión de vuelta al grupo
    }
  }
}

export { pool };
