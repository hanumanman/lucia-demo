CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`secret_hash` text,
	`created_at` text,
	`token` text
);
