CREATE TABLE `careers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`career` text NOT NULL,
	`qualification` text NOT NULL,
	`stream` text NOT NULL,
	`avg_salary` text NOT NULL,
	`salary_numeric` integer NOT NULL,
	`job_type` text NOT NULL,
	`demand` text NOT NULL,
	`growth_rate` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `colleges` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`district` text NOT NULL,
	`state` text DEFAULT 'Andhra Pradesh' NOT NULL,
	`stream` text NOT NULL,
	`type` text NOT NULL,
	`rating` real NOT NULL,
	`fees` text NOT NULL,
	`courses_offered` text NOT NULL,
	`contact` text,
	`email` text,
	`website` text,
	`affiliation` text NOT NULL,
	`latitude` real,
	`longitude` real,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stream_id` integer,
	`name` text NOT NULL,
	`duration` text NOT NULL,
	`fees` text NOT NULL,
	`eligibility` text NOT NULL,
	`description` text NOT NULL,
	`career_roles` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`stream_id`) REFERENCES `streams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`stream_id` integer,
	`name` text NOT NULL,
	`month` text NOT NULL,
	`difficulty` text NOT NULL,
	`eligibility` text NOT NULL,
	`description` text NOT NULL,
	`registration_link` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`stream_id`) REFERENCES `streams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`name` text NOT NULL,
	`district` text NOT NULL,
	`message` text NOT NULL,
	`email` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `streams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`description` text NOT NULL,
	`icon` text NOT NULL,
	`color` text NOT NULL,
	`paths` text NOT NULL,
	`average_salary` text NOT NULL,
	`duration` text NOT NULL,
	`popularity` text NOT NULL,
	`skills` text NOT NULL,
	`pros` text NOT NULL,
	`cons` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `streams_slug_unique` ON `streams` (`slug`);--> statement-breakpoint
CREATE TABLE `user_preferences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`district` text NOT NULL,
	`interested_streams` text NOT NULL,
	`marks_percentage` integer,
	`career_goals` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_preferences_user_id_unique` ON `user_preferences` (`user_id`);