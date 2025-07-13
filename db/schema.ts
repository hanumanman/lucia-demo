import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const sessionsTable = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  secretHash: blob("secret_hash"),
  createdAt: integer("created_at"),
})

export type InsertSession = typeof sessionsTable.$inferInsert
export type SelectSession = typeof sessionsTable.$inferSelect
