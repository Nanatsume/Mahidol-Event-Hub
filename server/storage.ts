import { events, type Event, type InsertEvent, type SavedEvent, type InsertSavedEvent } from "@shared/schema";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getSavedEvents(userId: number): Promise<SavedEvent[]>;
  saveEvent(savedEvent: InsertSavedEvent): Promise<SavedEvent>;
  unsaveEvent(userId: number, eventId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private events: Event[];
  private savedEvents: SavedEvent[];
  private savedEventId: number;

  constructor() {
    // Initialize with mock data
    this.events = [
      { 
        id: 1,
        title: "Rock Night 2025",
        date: "March 20",
        category: "Music",
        location: "Mahidol Hall",
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b",
        description: "Join us for an unforgettable rock concert featuring student bands and special guests! Doors open at 7 PM with refreshments available.",
        attendees: 156,
        organizer: "Music Club",
        isPast: false
      },
      {
        id: 2,
        title: "Mahidol Film Festival",
        date: "April 5",
        category: "Movies",
        location: "Cinema Room",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
        description: "Experience amazing student films and documentaries from Mahidol's talented filmmakers. Awards ceremony follows the screenings.",
        attendees: 89,
        organizer: "Film Society",
        isPast: false
      },
      // Add more mock events...
    ];
    this.savedEvents = [];
    this.savedEventId = 1;
  }

  async getEvents(): Promise<Event[]> {
    return this.events;
  }

  async getSavedEvents(userId: number): Promise<SavedEvent[]> {
    return this.savedEvents.filter(saved => saved.userId === userId);
  }

  async saveEvent(savedEvent: InsertSavedEvent): Promise<SavedEvent> {
    const newSavedEvent = {
      ...savedEvent,
      id: this.savedEventId++
    };
    this.savedEvents.push(newSavedEvent);
    return newSavedEvent;
  }

  async unsaveEvent(userId: number, eventId: number): Promise<void> {
    this.savedEvents = this.savedEvents.filter(
      saved => !(saved.userId === userId && saved.eventId === eventId)
    );
  }
}

export const storage = new MemStorage();
