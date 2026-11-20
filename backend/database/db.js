import pg from "pg";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default pool;