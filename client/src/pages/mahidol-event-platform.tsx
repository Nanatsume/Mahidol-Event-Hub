import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, Bell, Star, Calendar, Music, Film, Gamepad2, 
  Home, Info, Users, Book, Map, ChevronRight, Heart,
  Share2, MessageSquare, User, LogOut
} from "lucide-react";

interface MahidolEventPlatformProps {
  selectedEventId?: number;
}

export default function MahidolEventPlatform({ selectedEventId }: MahidolEventPlatformProps) {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  const categories = [
    { name: "All", icon: <Calendar /> },
    { name: "Music", icon: <Music /> },
    { name: "Movies", icon: <Film /> },
    { name: "Games", icon: <Gamepad2 /> },
    { name: "Academic", icon: <Book /> },
    { name: "Social", icon: <Users /> },
  ];

  const events = [
    { 
      id: 1,
      title: "Rock Night 2025", 
      date: "March 20", 
      category: "Music", 
      location: "Mahidol Hall", 
      image: "/images/rock.jpg", 
      description: "Join us for an unforgettable rock concert featuring student bands and special guests! Doors open at 7 PM with refreshments available.",
      attendees: 156,
      organizer: "Music Club"
    },
    { 
      id: 2,
      title: "Mahidol Film Festival", 
      date: "April 5", 
      category: "Movies", 
      location: "Cinema Room", 
      image: "/images/film.jpg", 
      description: "Experience amazing student films and documentaries from Mahidol's talented filmmakers. Awards ceremony follows the screenings.",
      attendees: 89,
      organizer: "Film Society" 
    },
    { 
      id: 3,
      title: "Gaming Tournament", 
      date: "April 10", 
      category: "Games", 
      location: "Student Lounge", 
      image: "/images/rov.jpg", 
      description: "Show your skills at our exciting gaming tournament with prizes for the winners! Both casual and competitive players welcome.",
      attendees: 42,
      organizer: "Esports Club"
    },
    { 
      id: 4,
      title: "Research Symposium", 
      date: "April 15", 
      category: "Academic", 
      location: "Learning Center", 
      image: "/images/research.jpg", 
      description: "Present your research projects and get feedback from faculty and peers. Great networking opportunity for aspiring researchers.",
      attendees: 78,
      organizer: "Research Department" 
    },
    { 
      id: 5,
      title: "International Food Fair", 
      date: "April 23", 
      category: "Social", 
      location: "Central Plaza", 
      image: "/images/food.jpg", 
      description: "Taste dishes from around the world prepared by international students. Cultural performances throughout the day.",
      attendees: 215,
      organizer: "International Student Association" 
    },
  ];

  const pastEvents = [
    { 
      id: 6,
      title: "Winter Concert", 
      date: "February 10", 
      category: "Music", 
      location: "Mahidol Hall", 
      image: "/images/winter.jpg", 
      description: "Classical music performance featuring Mahidol's symphony orchestra.",
      attendees: 178,
      organizer: "Music Department" 
    },
    { 
      id: 7,
      title: "Science Fair", 
      date: "January 25", 
      category: "Academic", 
      location: "Science Building", 
      image: "/images/sci.png", 
      description: "Annual science exhibition showcasing student projects and experiments.",
      attendees: 142,
      organizer: "Science Faculty" 
    },
  ];

  useEffect(() => {
    if (selectedEventId) {
      const event = [...events, ...pastEvents].find(e => e.id === selectedEventId);
      if (event) {
        setSelectedEvent(event);
      }
    }
  }, [selectedEventId]);

  const toggleSaveEvent = (eventId: number) => {
    setSavedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  const filteredEvents = (activeTab === "upcoming" ? events : pastEvents).filter(event => {
    // Filter by search term
    const matchesSearch = search === "" || 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <div className="flex justify-between items-center bg-blue-600 p-3 rounded-lg text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Mahidol Event Hub</h1>
        <div className="flex gap-2 items-center">
          <Button variant="ghost" className="text-white hidden md:flex">
            <Home className="mr-1" size={18} /> Home
          </Button>
          <Button variant="ghost" className="text-white hidden md:flex">
            <Calendar className="mr-1" size={18} /> Calendar
          </Button>
          <Button variant="ghost" className="text-white md:hidden"><Home size={18} /></Button>
          <Button variant="ghost" className="text-white md:hidden"><Calendar size={18} /></Button>
          <Button variant="ghost" className="text-white">
            <Bell size={18} />
          </Button>
          <div className="relative">
            <Avatar className="cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback>MU</AvatarFallback>
            </Avatar>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-gray-800 border-b">
                  <p className="font-semibold">Student Name</p>
                  <p className="text-xs text-gray-500">student@mahidol.ac.th</p>
                </div>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2" /> Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <Heart size={16} className="mr-2" /> Saved Events
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <LogOut size={16} className="mr-2" /> Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedEvent ? (
        /* Event Details Page */
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Button onClick={() => setSelectedEvent(null)} className="mb-4 bg-blue-600 text-white">
            Back to Events
          </Button>
          <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-2xl text-black font-bold mb-1">{selectedEvent.title}</h2>
              <p className="text-black-600 text-black mb-1">📅 {selectedEvent.date} | 📍 {selectedEvent.location}</p>
              <p className="text-gray-500 text-sm mb-2">Organized by: {selectedEvent.organizer}</p>
              <div className="flex gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-800">{selectedEvent.category}</Badge>
                <Badge className="bg-green-100 text-green-800">{selectedEvent.attendees} attending</Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                className={`flex gap-1 ${savedEvents.includes(selectedEvent.id) ? 'bg-red-50 text-red-500 border-red-200' : ''}`}
                onClick={() => toggleSaveEvent(selectedEvent.id)}
              >
                {savedEvents.includes(selectedEvent.id) ? <Heart fill="red" size={18} /> : <Heart size={18} />}
                {savedEvents.includes(selectedEvent.id) ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" className="flex gap-1">
                <Share2 size={18} /> Share
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg text-black font-semibold mb-2">About This Event</h3>
            <p className="text-gray-700">{selectedEvent.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg text-black font-semibold mb-2">Location</h3>
            <div className="bg-gray-100 p-3 rounded-lg flex items-center">
              <Map className="text-blue-600 mr-2" size={20} />
              <span>{selectedEvent.location}, Mahidol University</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-green-600 text-white flex-1">Register Now</Button>
            <Button className="bg-blue-600 text-white flex-1 flex items-center justify-center">
              <MessageSquare size={18} className="mr-2" /> Contact Organizer
            </Button>
          </div>
        </div>
      ) : (
        /* Main Event List */
        <>
          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search events, categories, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-blue-500 rounded-lg"
            />
            <Button className="bg-blue-600 text-white"><Search /></Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button 
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                className={`flex gap-1 ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'border-blue-600 text-blue-600'}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.icon} {cat.name}
              </Button>
            ))}
          </div>

          {/* Event Tabs */}
          <Tabs defaultValue="upcoming" className="mb-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 mb-2">No events found</p>
              <p className="text-gray-400 text-sm">Try another search term or category</p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {filteredEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="shadow-md border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                    <Button 
                      variant="ghost" 
                      className={`absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 ${savedEvents.includes(event.id) ? 'text-red-500' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveEvent(event.id);
                      }}
                    >
                      {savedEvents.includes(event.id) ? <Heart fill="red" size={18} /> : <Heart size={18} />}
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <Badge className="bg-blue-100 text-blue-800 mb-2">{event.category}</Badge>
                      <h3 className="text-lg font-bold text-blue-700 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
                      <p className="text-xs text-gray-400 mt-1">By {event.organizer}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <span>{event.attendees} attending</span>
                      </div>
                      <Button 
                        className="bg-blue-600 text-white text-sm px-3 py-1 h-auto flex items-center"
                        onClick={() => setSelectedEvent(event)}
                      >
                        Details <ChevronRight size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
