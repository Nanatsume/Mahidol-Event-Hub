import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";

export default function Calendar() {
  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
  });

  // Group events by date
  const eventsByDate = events.reduce((acc: any, event: any) => {
    if (!event.isPast) {  // Only show upcoming events
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
    }
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <CalendarIcon className="mr-2" /> Upcoming Events Calendar
      </h1>

      <div className="space-y-6">
        {Object.entries(eventsByDate).map(([date, dateEvents]: [string, any]) => (
          <div key={date} className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-4">{date}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {dateEvents.map((event: any) => (
                <Card key={event.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>{event.category}</Badge>
                        <Badge variant="outline">{event.attendees} attending</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
