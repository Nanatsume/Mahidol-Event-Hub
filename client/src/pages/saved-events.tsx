
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ChevronRight } from "lucide-react";

export default function SavedEvents() {
  const { data: savedEvents = [] } = useQuery({ queryKey: ["/api/saved-events"] });
  const { data: events = [] } = useQuery({ queryKey: ["/api/events"] });

  const savedEventDetails = events.filter((event: any) => 
    savedEvents.some((saved: any) => saved.eventId === event.id)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Saved Events</h1>
      {savedEventDetails.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 mb-2">No saved events</p>
          <p className="text-gray-400 text-sm">Events you save will appear here</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {savedEventDetails.map((event: any) => (
            <Card key={event.id} className="shadow-md">
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <Badge className="mb-2">{event.category}</Badge>
                <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{event.date} • {event.location}</p>
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{event.attendees} attending</span>
                  <Button className="bg-blue-600">
                    Details <ChevronRight size={16} />
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
