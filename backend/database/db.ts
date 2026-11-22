import {Pool} from "pg";
import {drizzle} from "drizzle-orm/node-postgres"
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = drizzle({client: pool, casing: 'snake_case'})

export type DB = typeof db;