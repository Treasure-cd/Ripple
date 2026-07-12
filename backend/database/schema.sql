CREATE TABLE if not exists users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    cached_balance INTEGER NOT NULL DEFAULT 0 CHECK (cached_balance >= 0),
    social_links TEXT DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE if not exists skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK (category IN ('Programming', 'Design', 'Language'))
);

CREATE TABLE if not exists user_skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id),
    skill_id INTEGER NOT NULL REFERENCES skills(id),
    intent TEXT NOT NULL CHECK (intent IN ('Teach', 'Learn')),
    proficiency_level TEXT CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Expert')),
    hourly_rate INTEGER DEFAULT 1,
    verified INTEGER NOT NULL DEFAULT 0,
    UNIQUE (user_id, skill_id, intent),
    CHECK (intent = 'Teach' OR hourly_rate IS NULL)
);

CREATE TABLE if not exists sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_skill_id INTEGER NOT NULL REFERENCES user_skills(id),
    learner_id INTEGER NOT NULL REFERENCES users(id),
    teacher_id INTEGER NOT NULL REFERENCES users(id),
    scheduled_at TEXT NOT NULL,
    credits_cost INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Cancelled')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT
);

CREATE TABLE if not exists transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER REFERENCES sessions(id),
    sender_id INTEGER NOT NULL REFERENCES users(id),
    receiver_id INTEGER NOT NULL REFERENCES users(id),
    amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Cancelled')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);