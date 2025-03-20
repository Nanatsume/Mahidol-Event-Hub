import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertSavedEventSchema = createInsertSchema(savedEvents).omit({ id: true });

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type SavedEvent = typeof savedEvents.$inferSelect;
export type InsertSavedEvent = z.infer<typeof insertSavedEventSchema>;
