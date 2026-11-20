import "dotenv/config";
import { betterAuth } from 'better-auth';
import pool from "./db.js";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) {
  throw new Error("BETTER_AUTH_SECRET must be set");
}

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    : undefined;
const github =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }
    : undefined;

export const auth = betterAuth({
  basePath: '/api/auth',
  trustedOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
  database: pool,
  secret,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(google ? { google } : {}),
    ...(github ? { github } : {}),
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await pool.query(
            `INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
            [user.id],
          );
        },
      },
    },
  },
});