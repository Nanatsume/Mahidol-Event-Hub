import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const categories = [
    { name: "All", icon: <Calendar /> },
    { name: "Music", icon: <Music /> },
    { name: "Movies", icon: <Film /> },
    { name: "Games", icon: <Gamepad2 /> },
    { name: "Academic", icon: <Book /> },
    { name: "Social", icon: <Users /> },
  ];

  // Fetch events from API
  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
  });

  const handleNavigation = (path: string) => {
    setSelectedEvent(null); // Clear selected event when navigating
    setLocation(path);
  };

  useQuery({
    queryKey: ["/api/registrations/check", 1, selectedEvent?.id],
    enabled: !!selectedEvent,
    onSuccess: (data) => {
      setIsUserRegistered(data.isRegistered);
    },
  });


  const filteredEvents = events.filter((event: any) => {
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
  });

  const toggleSaveEvent = (eventId: number) => {
    setSavedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 bg-gray-50 min-h-screen">

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
              {filteredEvents.map((event: any) => (
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