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

  // Register for an event
  app.post("/api/registrations", async (req, res) => {
    try {
      const registration = await storage.registerForEvent(req.body);
      res.json(registration);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user's registrations
  app.get("/api/registrations/user/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const registrations = await storage.getRegistrationsByUser(userId);
    res.json(registrations);
  });

  // Check if user is registered for an event
  app.get("/api/registrations/check/:userId/:eventId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const eventId = parseInt(req.params.eventId);
    const isRegistered = await storage.isUserRegistered(userId, eventId);
    res.json({ isRegistered });
  });

  const httpServer = createServer(app);
  return httpServer;
}