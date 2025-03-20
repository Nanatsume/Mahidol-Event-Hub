import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all events
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  // Get saved events for a user
  app.get("/api/saved-events/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const savedEvents = await storage.getSavedEvents(userId);
    res.json(savedEvents);
  });

  // Save an event
  app.post("/api/saved-events", async (req, res) => {
    const savedEvent = await storage.saveEvent(req.body);
    res.json(savedEvent);
  });

  // Unsave an event
  app.delete("/api/saved-events/:userId/:eventId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const eventId = parseInt(req.params.eventId);
    await storage.unsaveEvent(userId, eventId);
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
