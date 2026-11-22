import * as p from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { sql } from "drizzle-orm";
import {
  SkillCategory,
  SkillIntent,
  ProficiencyLevel,
  SessionStatus,
  TransactionStatus,
} from "../../types/enums";

export const SkillCategoryEnum = p.pgEnum("skill_category", SkillCategory);
export const SkillIntentEnum = p.pgEnum("skill_intent", SkillIntent);
export const ProficiencyLevelEnum = p.pgEnum(
  "proficiency_level",
  ProficiencyLevel,
);
export const SessionStatusEnum = p.pgEnum("session_status", SessionStatus);
export const TransactionStatusEnum = p.pgEnum(
  "transaction_status",
  TransactionStatus,
);

export const profiles = p.pgTable("profiles", {
  userId: p
    .text()
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  cachedBalance: p.integer().notNull().default(0),
  socialLinks: p.jsonb().notNull().default([]),
});

export const skills = p.pgTable("skills", {
  id: p.serial().primaryKey(),
  name: p.text().notNull().unique(),
  category: SkillCategoryEnum().notNull(),
});

export const userSkills = p.pgTable(
  "user_skills",
  {
    id: p.serial().primaryKey(),
    userId: p
      .text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    skillId: p
      .integer()
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
    intent: SkillIntentEnum().notNull(),
    proficiencyLevel: ProficiencyLevelEnum(),
    hourlyRate: p.integer().default(1),
    verified: p.boolean().notNull().default(false),
  },
  (t) => [
    p.unique().on(t.userId, t.skillId, t.intent),
    p.check(
      "user_skills_rate_check",
      sql`${t.intent} = ${sql.raw(`'${SkillIntent.Teach}'`)} OR ${t.hourlyRate} IS NULL`,
    ),
  ],
);

export const sessions = p.pgTable("sessions", {
  id: p.serial().primaryKey(),
  userSkillId: p
    .integer()
    .notNull()
    .references(() => userSkills.id),
  learnerId: p
    .text()
    .notNull()
    .references(() => user.id),
  teacherId: p
    .text()
    .notNull()
    .references(() => user.id),
  scheduledAt: p.timestamp().notNull(),
  creditsCost: p.integer().notNull(),
  status: SessionStatusEnum().notNull().default(SessionStatus.Pending),
  createdAt: p.timestamp().notNull().defaultNow(),
  completedAt: p.timestamp(),
});

export const transactions = p.pgTable("transactions", {
  id: p.serial().primaryKey(),
  sessionId: p.integer().references(() => sessions.id),
  senderId: p
    .text()
    .notNull()
    .references(() => user.id),
  receiverId: p
    .text()
    .notNull()
    .references(() => user.id),
  amount: p.integer().notNull(),
  status: TransactionStatusEnum().default(TransactionStatus.Pending).notNull(),
  createdAt: p.timestamp().notNull().defaultNow(),
});
