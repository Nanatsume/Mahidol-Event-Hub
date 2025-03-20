import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  attendees: integer("attendees").notNull(),
  organizer: text("organizer").notNull(),
  isPast: boolean("is_past").notNull().default(false)
});

export const savedEvents = pgTable("saved_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  eventId: integer("event_id").notNull()
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  eventId: integer("event_id").notNull(),
  status: text("status").notNull().default("registered"), // registered, cancelled, waitlisted
  registeredAt: timestamp("registered_at").notNull().defaultNow()
});

// Schema for user operations
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true 
}).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
});

// Other schemas remain the same
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertSavedEventSchema = createInsertSchema(savedEvents).omit({ id: true });
export const insertRegistrationSchema = createInsertSchema(registrations).omit({ id: true, registeredAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type SavedEvent = typeof savedEvents.$inferSelect;
export type InsertSavedEvent = z.infer<typeof insertSavedEventSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;