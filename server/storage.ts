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
        image: "/attached_assets/rock.jpg",
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
        image: "/attached_assets/film.jpg",
        description: "Experience amazing student films and documentaries from Mahidol's talented filmmakers. Awards ceremony follows the screenings.",
        attendees: 89,
        organizer: "Film Society",
        isPast: false
      },
      {
        id: 3,
        title: "Gaming Tournament",
        date: "April 10",
        category: "Games",
        location: "Student Lounge",
        image: "/attached_assets/rov.jpg",
        description: "Show your skills at our exciting gaming tournament with prizes for the winners! Both casual and competitive players welcome.",
        attendees: 42,
        organizer: "Esports Club",
        isPast: false
      },
      {
        id: 4,
        title: "Research Symposium",
        date: "April 15",
        category: "Academic",
        location: "Learning Center",
        image: "/attached_assets/research.jpg",
        description: "Present your research projects and get feedback from faculty and peers. Great networking opportunity for aspiring researchers.",
        attendees: 78,
        organizer: "Research Department",
        isPast: false
      },
      {
        id: 5,
        title: "International Food Fair",
        date: "April 23",
        category: "Social",
        location: "Central Plaza",
        image: "/attached_assets/food.jpg",
        description: "Taste dishes from around the world prepared by international students. Cultural performances throughout the day.",
        attendees: 215,
        organizer: "International Student Association",
        isPast: false
      }
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