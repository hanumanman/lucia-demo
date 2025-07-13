DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `sessions` ALTER COLUMN "secret_hash" TO "secret_hash" blob;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `sessions` ALTER COLUMN "created_at" TO "created_at" integer;