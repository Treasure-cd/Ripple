import { betterAuth } from 'better-auth';
import pool from "./db.js"
import { admin, username } from 'better-auth/plugins';

export const auth = betterAuth({
  basePath: '/auth',
  trustedOrigins: [
    'http://localhost:3000',
  ],
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await pool.query(
            'INSERT INTO profiles (user_id, cached_balance, social_links) VALUES ($1, $2, $3)',
            [user.id, 0]
          );
        }
      }
    }
  }
});