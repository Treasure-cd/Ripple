# Ripple Backend

## Purpose

This backend service powers the Ripple application by handling:

- user authentication and authorization
- persistence for app data
- API endpoints consumed by the frontend
- basic server-side logging and error handling

This project is currently a local development backend only. It is not hosted publicly, so the frontend should expect to communicate with it through a locally running server.

## What a frontend developer should know

- The backend runs locally on port 5500 by default.
- The main API base URL while developing is:
  - http://localhost:5500
- API routes are grouped under the `/api` prefix.
- Authenticated requests typically use a Bearer token in the `Authorization` header.
- The backend expects and returns JSON for most API requests.
- If the server is not running, frontend requests will fail until the backend is started locally.

## Local setup

### 1. Install dependencies

From the backend folder:

```bash
pnpm install
```

### 2. Create environment variables

Create a `.env` file in the backend folder if one does not already exist. At minimum, the app expects configuration such as:

```env
JWT_SECRET=your_secret_here
```

You may also add any other local environment values required by the app.

### 3. Initialize the database

Run:

```bash
node database/init.js
```

This creates the database structure needed by the app.

### 4. Start the backend

For normal startup:

```bash
pnpm start
```

For development with auto-reload behavior:

```bash
pnpm dev
```

Once running, the server should log that it is listening on port 5500.

## Backend structure

```text
backend/
  controllers/      # Request handlers for each feature
  database/         # Database connection and schema setup
  middleware/       # Auth, logging, async handling, error handling
  queries/          # SQL/query logic for database operations
  routes/           # API route definitions
  services/         # Business logic and shared app logic
  utils/            # Helper utilities such as JWT helpers and errors
  index.js          # Main Express server entry point
  package.json      # Backend scripts and dependencies
```

## Development notes

- The server entry point is [backend/index.js](index.js).
- Logging is already set up for development output.
- Errors are handled through the shared error middleware.
- The app is using ESM modules, so import syntax follows Node's ES module style.

## Notes for frontend integration

- For local development, point the frontend to the local backend URL.
- If authentication is required, make sure the frontend stores and sends the token after login.
- If you need endpoint details, refer to the API documentation rather than the backend source structure.
