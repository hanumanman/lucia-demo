DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `sessions` ALTER COLUMN "secret_hash" TO "secret_hash" blob NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `sessions` ALTER COLUMN "created_at" TO "created_at" integer NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ADD `last_verified_at` integer NOT NULL;