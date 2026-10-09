CREATE TABLE IF NOT EXISTS profiles (
    user_id TEXT PRIMARY KEY REFERENCES "user"(id) ON DELETE CASCADE,
    cached_balance INTEGER DEFAULT 0,
    social_links JSONB
);

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