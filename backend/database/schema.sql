CREATE TABLE IF NOT EXISTS "user" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
    image TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    scope TEXT,
    password TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    token TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY REFERENCES "user"(id) ON DELETE CASCADE,
    cached_balance INTEGER NOT NULL DEFAULT 0,
    social_links JSONB NOT NULL DEFAULT '[]'::jsonb
);

ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS cached_balance INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS social_links JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE profiles
SET cached_balance = COALESCE(cached_balance, 0),
    social_links = COALESCE(social_links, '[]'::jsonb);

ALTER TABLE profiles
    ALTER COLUMN cached_balance SET DEFAULT 0,
    ALTER COLUMN cached_balance SET NOT NULL,
    ALTER COLUMN social_links SET DEFAULT '[]'::jsonb,
    ALTER COLUMN social_links SET NOT NULL;

INSERT INTO profiles (user_id)
SELECT id FROM "user"
ON CONFLICT (user_id) DO NOTHING;

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('Programming', 'Design', 'Language'))
);

CREATE TABLE IF NOT EXISTS user_skills (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    intent TEXT NOT NULL CHECK (intent IN ('Teach', 'Learn')),
    proficiency_level TEXT CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Expert')),
    hourly_rate INTEGER DEFAULT 1,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (user_id, skill_id, intent),
    CHECK (intent = 'Teach' OR hourly_rate IS NULL)
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_skill_id INTEGER NOT NULL REFERENCES user_skills(id),
    learner_id TEXT NOT NULL REFERENCES "user"(id),
    teacher_id TEXT NOT NULL REFERENCES "user"(id),
    scheduled_at TIMESTAMP NOT NULL,
    credits_cost INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Cancelled')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES sessions(id),
    sender_id TEXT NOT NULL REFERENCES "user"(id),
    receiver_id TEXT NOT NULL REFERENCES "user"(id),
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Cancelled')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
