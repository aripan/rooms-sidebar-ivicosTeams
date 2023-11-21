import { Pool } from "pg";

// Create a new pool instance with your local PostgreSQL credentials
const pool = new Pool({
  user: process.env.POSTGRES_ROLE, // Your PostgreSQL username/role
  password: process.env.POSTGRES_PASSWORD, // Your PostgreSQL password
  host: process.env.POSTGRES_HOST, // PostgreSQL server host
  database: process.env.POSTGRES_DB, // Your PostgreSQL database name
  port: process.env.POSTGRES_PORT, // PostgreSQL server port
});

export default pool;
