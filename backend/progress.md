# Backend Progress

This file records the backend implementation currently present in the repository, compared with the intended behavior in `design-mockup.md`. It is a code review snapshot; items listed as implemented have not been runtime-tested here.

## Implemented

- Express server listens on port `5500`, enables CORS for `FRONTEND_URL` (default `http://localhost:3000`), parses JSON, logs requests, and returns shared 404/error responses.
- Better Auth is configured with email/password and optional Google and GitHub providers. Auth requests are mounted under `/api/auth`; new users get a profile row. `BETTER_AUTH_SECRET` and `DATABASE_URL` are required.
- PostgreSQL schema and initialization script define Better Auth tables plus profiles, skills, user skills, sessions, and transactions. Profiles hold cached balance and social links; user skills include intent, proficiency, hourly rate, and a verified flag.
- Authenticated profile endpoints fetch and update the current user's name and social links (`GET/PATCH /api/users/me`).
- Authenticated skill endpoints list, create, and search skills (`GET/POST /api/skills`, `GET /api/skills/search`).
- Authenticated user-skill endpoints add and list the current user's skills (`POST/GET /api/users/me/skills`).
- Query functions exist for teacher listings and skill detail, but they are not currently connected to routes/controllers.
- Query functions implement session booking with a learner credit debit and pending transaction, plus completion and cancellation operations that update session/transaction status and credit balances within a database transaction.
- Swagger UI is mounted at `/api/docs`, with OpenAPI annotations for the currently routed profile, skill, and user-skill endpoints.

## Remaining work

### API and product behavior

- Add routes/controllers for teacher discovery and skill detail using the existing feed queries.
- Expose session booking, listing/detail, completion, and cancellation through authenticated API routes/controllers. Validate that the selected user skill is a teaching offer, the learner and teacher are distinct, scheduled time and credit cost are valid, and only authorized users can act.
- Decide and implement session duration and pricing rules. The design describes one hour per credit by default with a per-user editable rate, while the current booking query accepts an arbitrary `creditsCost` and the schema has no duration field.
- Add ledger history and reconcile the cached balance against ledger entries. The current schema has transactions but no separate credit ledger, and the current session queries update balances directly.
- Decide who may create skills; the current create-skill endpoint is available to any authenticated user.
- Add user-skill update/removal and any needed user profile/discovery endpoints.
- Implement review storage and endpoints, including the intended aggregate rating behavior. There is no reviews table or review API in the current schema/code.
- Implement GitHub-based programming skill verification and the verification flow for other skill categories. The `verified` column exists, but no verification routes or logic are present.
- Complete social sign-in/profile behavior as needed; Google/GitHub OAuth is only configured when credentials are supplied, and GitHub skill verification is not implemented by that configuration.

### Data integrity and operational readiness

- Define and enforce transaction/ledger invariants, including protection against concurrent duplicate completion/cancellation and ensuring transaction rows correspond to one valid session.
- Review schema constraints and migration strategy for existing databases; `init.js` executes the schema but there is no versioned migration workflow.
- Add consistent validation and error handling for PostgreSQL constraint errors. The shared handler currently checks a SQLite-style foreign-key message, while this project uses PostgreSQL.
- Confirm the API's authentication transport and update docs accordingly. Better Auth session lookup is used by middleware; the README currently describes Bearer tokens.
- Ensure database initialization closes the pool on failure/success and reports failure with a non-zero process exit code.
- Add/update API documentation for auth, discovery, sessions, transactions, reviews, verification, and the actual response/auth formats.
- Add automated tests and a smoke-test setup for auth, profile/skill endpoints, database initialization, and credit/session lifecycle.
- Document all required environment variables and provider setup, including `DATABASE_URL`, `BETTER_AUTH_SECRET`, optional OAuth credentials, and `FRONTEND_URL`.

## Notes

- `queries/session.queries.js` is currently not imported by any route or controller, so its session and credit operations are not reachable through the HTTP API.
- `queries/feed.queries.js` is likewise not currently exposed through the HTTP API.
- The README describes a local development server and setup steps; it should be kept in sync as the API and environment configuration become complete.
