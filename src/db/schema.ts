import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';



// Auth tables for better-auth
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// Career guidance platform tables
export const streams = sqliteTable('streams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  paths: text('paths', { mode: 'json' }).notNull(),
  averageSalary: text('average_salary').notNull(),
  duration: text('duration').notNull(),
  popularity: text('popularity').notNull(),
  skills: text('skills', { mode: 'json' }).notNull(),
  pros: text('pros', { mode: 'json' }).notNull(),
  cons: text('cons', { mode: 'json' }).notNull(),
  successStories: text('success_stories', { mode: 'json' }).notNull().$defaultFn(() => []),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  streamId: integer('stream_id').references(() => streams.id),
  name: text('name').notNull(),
  duration: text('duration').notNull(),
  fees: text('fees').notNull(),
  eligibility: text('eligibility').notNull(),
  description: text('description').notNull(),
  careerRoles: text('career_roles', { mode: 'json' }).notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const colleges = sqliteTable('colleges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  location: text('location').notNull(),
  district: text('district').notNull(),
  state: text('state').notNull().default('Andhra Pradesh'),
  stream: text('stream').notNull(),
  type: text('type').notNull(),
  rating: real('rating').notNull(),
  fees: text('fees').notNull(),
  coursesOffered: text('courses_offered', { mode: 'json' }).notNull(),
  contact: text('contact'),
  email: text('email'),
  website: text('website'),
  affiliation: text('affiliation').notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const exams = sqliteTable('exams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  streamId: integer('stream_id').references(() => streams.id),
  name: text('name').notNull(),
  month: text('month').notNull(),
  difficulty: text('difficulty').notNull(),
  eligibility: text('eligibility').notNull(),
  description: text('description').notNull(),
  registrationLink: text('registration_link'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const careers = sqliteTable('careers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  career: text('career').notNull(),
  qualification: text('qualification').notNull(),
  stream: text('stream').notNull(),
  avgSalary: text('avg_salary').notNull(),
  salaryNumeric: integer('salary_numeric').notNull(),
  jobType: text('job_type').notNull(),
  demand: text('demand').notNull(),
  growthRate: text('growth_rate').notNull(),
  roleModels: text('role_models', { mode: 'json' }).notNull().$defaultFn(() => []),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const feedback = sqliteTable('feedback', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  district: text('district').notNull(),
  message: text('message').notNull(),
  email: text('email').notNull(),
  createdAt: text('created_at').notNull(),
});

export const userPreferences = sqliteTable('user_preferences', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().unique().references(() => user.id, { onDelete: 'cascade' }),
  district: text('district').notNull(),
  interestedStreams: text('interested_streams', { mode: 'json' }).notNull(),
  marksPercentage: integer('marks_percentage'),
  careerGoals: text('career_goals'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});