import { createPool } from "mysql2";

const pool = createPool({
  host: "localhost",
  user: "stckctrl_test",
  password: "g1*fgYpq+2v$",
  port: 3306,
  database: "test_db",
});

export { pool };
