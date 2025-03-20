import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MahidolEventPlatform from "./mahidol-event-platform";

export default function EventDetails() {
  const [, params] = useRoute("/event/:id");
  const eventId = parseInt(params?.id || "0");

  const { data: events } = useQuery({
    queryKey: ["/api/events"],
  });

  const event = events?.find(e => e.id === eventId);

  return <MahidolEventPlatform selectedEventId={eventId} />;
}
