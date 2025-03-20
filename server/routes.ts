import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes and middleware
  setupAuth(app);

  // Get all events
  app.get("/api/events", async (_req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  // Protected routes - require authentication
  app.use("/api/saved-events", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  });

  // Get saved events for a user
  app.get("/api/saved-events", async (req, res) => {
    const userId = req.user!.id;
    const savedEvents = await storage.getSavedEvents(userId);
    res.json(savedEvents);
  });

  // Save an event
  app.post("/api/saved-events", async (req, res) => {
    const savedEvent = await storage.saveEvent({
      ...req.body,
      userId: req.user!.id,
    });
    res.json(savedEvent);
  });

  // Unsave an event
  app.delete("/api/saved-events/:eventId", async (req, res) => {
    const userId = req.user!.id;
    const eventId = parseInt(req.params.eventId);
    await storage.unsaveEvent(userId, eventId);
    res.sendStatus(200);
  });

  // Protected registration routes
  app.use("/api/registrations", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  });

  // Register for an event
  app.post("/api/registrations", async (req, res) => {
    try {
      const registration = await storage.registerForEvent({
        ...req.body,
        userId: req.user!.id,
      });
      res.json(registration);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get user's registrations
  app.get("/api/registrations", async (req, res) => {
    const registrations = await storage.getRegistrationsByUser(req.user!.id);
    res.json(registrations);
  });

  // Check if user is registered for an event
  app.get("/api/registrations/check/:eventId", async (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const isRegistered = await storage.isUserRegistered(req.user!.id, eventId);
    res.json({ isRegistered });
  });

  const httpServer = createServer(app);
  return httpServer;
}