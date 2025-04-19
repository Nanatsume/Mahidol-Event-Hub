import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export default function SavedEvents() {
  const [_, setLocation] = useLocation();
  const [savedEventIds, setSavedEventIds] = useState<number[]>([]);

  // Fetch all events
  const { data: events = [] } = useQuery({ 
    queryKey: ["/api/events"] 
  });

  // Load saved events from localStorage on component mount
  useEffect(() => {
    const savedEventsFromStorage = localStorage.getItem('savedEvents');
    if (savedEventsFromStorage) {
      setSavedEventIds(JSON.parse(savedEventsFromStorage));
    }
  }, []);

  // Filter to get only saved events
  const savedEventDetails = events.filter((event: any) => 
    savedEventIds.includes(event.id)
  );

  const goToHome = () => {
    setLocation("/");
  };

  const viewEventDetails = (event: any) => {
    // Store the event to view in localStorage to persist it across navigation
    localStorage.setItem('selectedEventId', event.id.toString());
    // Redirect to main page
    setLocation("/");
  };

  const removeFromSaved = (eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // Update local state
    const newSavedEvents = savedEventIds.filter(id => id !== eventId);
    setSavedEventIds(newSavedEvents);

    // Update localStorage
    localStorage.setItem('savedEvents', JSON.stringify(newSavedEvents));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col gap-4 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-4">
        <Button onClick={goToHome} variant="outline" className="mr-3">
          <ChevronLeft size={16} /> Back
        </Button>
        <h1 className="text-2xl font-bold">Saved Events</h1>
      </div>

      {savedEventDetails.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 mb-2">No saved events</p>
          <p className="text-gray-400 text-sm">Events you save will appear here</p>
          <Button onClick={goToHome} className="mt-4 bg-blue-600 text-white">
            Browse Events
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {savedEventDetails.map((event: any) => (
            <Card 
              key={event.id} 
              className="shadow-md border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
              onClick={() => viewEventDetails(event)}
            >
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 text-red-500"
                  onClick={(e) => removeFromSaved(event.id, e)}
                >
                  <Heart fill="red" size={18} />
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
                  >
                    Details <ChevronRight size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}