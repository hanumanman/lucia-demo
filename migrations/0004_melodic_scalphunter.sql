PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`secret_hash` blob,
	`created_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("id", "secret_hash", "created_at") SELECT "id", "secret_hash", "created_at" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;