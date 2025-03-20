import { events, type Event, type InsertEvent, type SavedEvent, type InsertSavedEvent, type Registration, type InsertRegistration, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Existing methods
  getEvents(): Promise<Event[]>;
  getSavedEvents(userId: number): Promise<SavedEvent[]>;
  saveEvent(savedEvent: InsertSavedEvent): Promise<SavedEvent>;
  unsaveEvent(userId: number, eventId: number): Promise<void>;
  registerForEvent(registration: InsertRegistration): Promise<Registration>;
  getRegistrationsByUser(userId: number): Promise<Registration[]>;
  getRegistrationsByEvent(eventId: number): Promise<Registration[]>;
  isUserRegistered(userId: number, eventId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Event[];
  private savedEvents: SavedEvent[];
  private registrations: Registration[];
  private userId: number;
  private savedEventId: number;
  private registrationId: number;

  constructor() {
    this.users = new Map();
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
    this.registrations = [];
    this.userId = 1;
    this.savedEventId = 1;
    this.registrationId = 1;
  }

  // User methods implementation
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Existing methods remain the same
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

  async registerForEvent(registration: InsertRegistration): Promise<Registration> {
    const existingRegistration = await this.isUserRegistered(registration.userId, registration.eventId);
    if (existingRegistration) {
      throw new Error("User is already registered for this event");
    }

    const newRegistration: Registration = {
      ...registration,
      id: this.registrationId++,
      registeredAt: new Date(),
    };

    this.registrations.push(newRegistration);

    // Update attendee count
    const event = this.events.find(e => e.id === registration.eventId);
    if (event) {
      event.attendees += 1;
    }

    return newRegistration;
  }

  async getRegistrationsByUser(userId: number): Promise<Registration[]> {
    return this.registrations.filter(reg => reg.userId === userId);
  }

  async getRegistrationsByEvent(eventId: number): Promise<Registration[]> {
    return this.registrations.filter(reg => reg.eventId === eventId);
  }

  async isUserRegistered(userId: number, eventId: number): Promise<boolean> {
    return this.registrations.some(
      reg => reg.userId === userId && reg.eventId === eventId && reg.status === "registered"
    );
  }
}

export const storage = new MemStorage();