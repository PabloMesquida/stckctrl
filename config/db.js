import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "160.153.72.136",
  user: "stckctrl_test",
  password: "g1*fgYpq+2v$",
  port: "3306",
  database: "test_db",
});

export default connection;

// const pool = createPool({
//   // host: process.env.NEXT_PUBLIC_DB_HOST,
//   // user: process.env.NEXT_PUBLIC_DB_USER,
//   // password: process.env.NEXT_PUBLIC_DB_PASSWORD,
//   // port: 3306,
//   // database: process.env.NEXT_PUBLIC_DB_NAME,
//   host: "160.153.72.136",
//   user: "stckctrl_test",
//   password: "g1*fgYpq+2v$",
//   port: 3306,
//   database: "test_db",
// });

// export { pool };
