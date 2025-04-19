import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  Calendar,
  Music,
  Film,
  Gamepad2,
  Home,
  Users,
  Book,
  Map,
  ChevronRight,
  Heart,
  Share2,
  MessageSquare,
  User,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Event } from "@shared/schema";

interface MahidolEventPlatformProps {
  selectedEventId?: number;
}

interface RegistrationCheckResponse {
  isRegistered: boolean;
}

export default function MahidolEventPlatform({ selectedEventId }: MahidolEventPlatformProps) {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [savedEvents, setSavedEvents] = useState<number[]>([]);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const categories = [
    { name: "All", icon: <Calendar /> },
    { name: "Music", icon: <Music /> },
    { name: "Movies", icon: <Film /> },
    { name: "Games", icon: <Gamepad2 /> },
    { name: "Academic", icon: <Book /> },
    { name: "Social", icon: <Users /> },
  ];

  // Fetch events from API
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Load saved events from localStorage on component mount
  useEffect(() => {
    const savedEventsFromStorage = localStorage.getItem('savedEvents');
    if (savedEventsFromStorage) {
      setSavedEvents(JSON.parse(savedEventsFromStorage));
    }
  }, []);

  // Check for selectedEventId in localStorage when component mounts
  useEffect(() => {
    const storedEventId = localStorage.getItem('selectedEventId');
    if (storedEventId && Array.isArray(events)) {
      // Find the event in the events list
      const event = events.find((e) => e.id === parseInt(storedEventId));
      if (event) {
        setSelectedEvent(event);
      }
      // Clear the stored ID to prevent it from being loaded again
      localStorage.removeItem('selectedEventId');
    }
  }, [events]);

  // Save to localStorage whenever savedEvents changes
  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  const handleNavigation = (path: string) => {
    setSelectedEvent(null); // Clear selected event when navigating
    setLocation(path);
  };

  // Check if user is registered for the selected event
  const registrationCheck = useQuery<RegistrationCheckResponse>({
    queryKey: ["/api/registrations/check", 1, selectedEvent?.id],
    enabled: !!selectedEvent,
  });

  // Update isUserRegistered when registration check data changes
  useEffect(() => {
    if (registrationCheck.data) {
      setIsUserRegistered(registrationCheck.data.isRegistered);
    }
  }, [registrationCheck.data]);

  const filteredEvents = Array.isArray(events) ? events.filter((event) => {
    // Filter by search term (case-insensitive)
    const searchLower = search.toLowerCase();
    const matchesSearch = search === "" || 
      event.title.toLowerCase().includes(searchLower) ||
      event.category.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.organizer.toLowerCase().includes(searchLower);

    // Filter by category
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;

    // Filter by past/upcoming
    const matchesTab = activeTab === "upcoming" ? !event.isPast : event.isPast;

    return matchesSearch && matchesCategory && matchesTab;
  }) : [];

  const toggleSaveEvent = (eventId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    setSavedEvents(prev => {
      if (prev.includes(eventId)) {
        // Remove the event
        toast({
          title: "Event removed",
          description: "Event removed from your saved list",
        });
        return prev.filter(id => id !== eventId);
      } else {
        // Add the event
        toast({
          title: "Event saved",
          description: "Event added to your saved list",
        });
        return [...prev, eventId];
      }
    });
  };

  const goToSavedEvents = () => {
    setLocation("/saved-events");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {selectedEvent ? (
        /* Event Details Page */
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          <div className="flex justify-between mb-6">
            <Button onClick={() => setSelectedEvent(null)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all">
              <ChevronRight className="rotate-180 mr-1" size={16} /> Back to Events
            </Button>
            <Button onClick={goToSavedEvents} className="bg-blue-100 hover:bg-blue-200 text-blue-800 shadow-sm transition-all">
              <Heart size={16} className="mr-1" /> Saved Events
            </Button>
          </div>
          
          <div className="relative mb-6">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title} 
              className="w-full h-80 object-cover rounded-xl shadow-md" 
            />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl"></div>
            <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-800 font-medium px-3 py-1.5 text-sm shadow-sm">
              {selectedEvent.category}
            </Badge>
          </div>

          <div className="flex flex-wrap justify-between items-start mb-8">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-3xl text-blue-800 font-bold mb-2">{selectedEvent.title}</h2>
              <div className="flex items-center text-gray-700 mb-2">
                <Calendar className="mr-2" size={18} /> 
                <span className="font-medium">{selectedEvent.date}</span>
                <span className="mx-2">|</span>
                <Map className="mr-2" size={18} /> 
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="mr-2" size={16} />
                <span className="text-sm">{selectedEvent.attendees} attending</span>
                <span className="mx-2">•</span>
                <User className="mr-2" size={16} />
                <span className="text-sm">Organized by: <span className="font-medium">{selectedEvent.organizer}</span></span>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                className={`transition-all shadow-sm ${
                  savedEvents.includes(selectedEvent.id) 
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                    : 'hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => toggleSaveEvent(selectedEvent.id)}
              >
                {savedEvents.includes(selectedEvent.id) 
                  ? <><Heart fill="currentColor" size={18} className="mr-2" /> Saved</>
                  : <><Heart size={18} className="mr-2" /> Save Event</>
                }
              </Button>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
                <Share2 size={18} className="mr-2" /> Share
              </Button>
            </div>
          </div>

          <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl text-blue-800 font-semibold mb-3">About This Event</h3>
            <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl text-blue-800 font-semibold mb-3">Location</h3>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Map className="text-blue-700" size={24} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{selectedEvent.location}</h4>
                <p className="text-gray-600 text-sm">Mahidol University</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1 flex items-center justify-center py-6 shadow-md rounded-xl transition-all">
              <MessageSquare size={20} className="mr-2" /> Contact Organizer
            </Button>
          </div>
        </div>
      ) : (
        /* Main Event List */
        <>
          {/* Hero section */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-8 rounded-2xl shadow-lg mb-6">
            <h1 className="text-3xl font-bold mb-3">Mahidol University Events</h1>
            <p className="text-blue-100 mb-6">Discover exciting events happening around campus</p>
            
            {/* Search Bar */}
            <div className="flex gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
              <Input
                placeholder="Search events, categories, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 bg-transparent text-white placeholder:text-blue-100"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-md"><Search /></Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? "default" : "outline"}
                className={`flex gap-2 items-center transition-all ${
                  selectedCategory === cat.name 
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                    : 'border-blue-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50'
                }`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <div className={`${selectedCategory === cat.name ? '' : 'text-blue-500'}`}>
                  {cat.icon}
                </div>
                <span>{cat.name}</span>
              </Button>
            ))}
          </div>

          {/* Navigation Bar with Tabs */}
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="upcoming" className="flex-1" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-blue-100 p-1">
                <TabsTrigger 
                  value="upcoming" 
                  className={activeTab === "upcoming" ? "bg-white text-blue-800 shadow-md" : "text-blue-600 hover:text-blue-800"}
                >
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger 
                  value="past" 
                  className={activeTab === "past" ? "bg-white text-blue-800 shadow-md" : "text-blue-600 hover:text-blue-800"}
                >
                  Past Events
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Events List */}
          {filteredEvents.length === 0 ? (
            <div className="text-center p-12 bg-white rounded-xl shadow-md border border-gray-100">
              <Calendar className="w-16 h-16 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try another search term or category</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {filteredEvents.map((event: any) => (
                <Card
                  key={event.id}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl overflow-hidden bg-white"
                >
                  <div className="relative">
                    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <Button
                      variant="ghost"
                      className={`absolute top-3 right-3 rounded-full w-9 h-9 p-0 flex items-center justify-center transition-all ${
                        savedEvents.includes(event.id) 
                          ? 'bg-white text-red-500 hover:bg-white/90' 
                          : 'bg-black/30 text-white hover:bg-black/50'
                      }`}
                      onClick={(e) => toggleSaveEvent(event.id, e)}
                    >
                      {savedEvents.includes(event.id) ? <Heart fill="currentColor" size={18} /> : <Heart size={18} />}
                    </Button>
                    
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-blue-600/80 text-white backdrop-blur-sm font-medium px-2.5 py-1">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="text-xl font-bold text-blue-800 hover:text-blue-600 mb-2 line-clamp-1 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <Calendar className="mr-1.5" size={14} /> 
                      <span>{event.date}</span>
                      <span className="mx-1.5">•</span>
                      <Map className="mr-1.5" size={14} /> 
                      <span>{event.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users size={14} className="mr-1.5" />
                        <span>{event.attendees} attending</span>
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 h-auto rounded-full shadow-md transition-colors flex items-center"
                        onClick={() => setSelectedEvent(event)}
                      >
                        Details <ChevronRight size={14} className="ml-1" />
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