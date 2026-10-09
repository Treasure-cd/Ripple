import pg from "pg";

if (!process.env.DATABASE_URL) {
  process.loadEnvFile();
}

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default pool;