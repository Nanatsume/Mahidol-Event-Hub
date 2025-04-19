import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  PlusCircle, 
  Calendar, 
  Users, 
  TrendingUp, 
  Settings, 
  MapPin, 
  Edit, 
  Trash2, 
  Share2,
  User,
  Clock,
  Bell,
  BarChart2,
  CheckCircle2,
  InfoIcon
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Event, Registration } from "@shared/schema";

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch events created by this organizer
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Mock data for registrations - in a real app, this would come from an API call
  const { data: registrations = [] } = useQuery<Registration[]>({
    queryKey: ["/api/registrations"],
  });

  // Filter events that are organized by current user
  const organizerEvents = events.filter(event => event.organizer === user?.username);
  
  // Analytics data
  const totalAttendees = organizerEvents.reduce((acc, event) => acc + event.attendees, 0);
  const totalEvents = organizerEvents.length;
  const upcomingEvents = organizerEvents.filter(event => !event.isPast).length;
  
  const handleCreateEvent = () => {
    toast({
      title: "Feature coming soon",
      description: "The event creation functionality is under development."
    });
  };
  
  const handleEventAction = (action: string, eventId: number) => {
    toast({
      title: `Event ${action}`,
      description: `Event ID ${eventId} has been ${action}d.`
    });
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">Event Organizer Dashboard</h1>
          <p className="text-gray-600">Manage your events and view analytics</p>
        </div>
        <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">
            <BarChart2 className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="events">
            <Calendar className="mr-2 h-4 w-4" /> My Events
          </TabsTrigger>
          <TabsTrigger value="attendees">
            <Users className="mr-2 h-4 w-4" /> Attendees
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-700">Total Events</CardTitle>
                <CardDescription>Events you've organized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-10 w-10 text-blue-600 mr-4" />
                  <div className="text-3xl font-bold">{totalEvents}</div>
                </div>
                <div className="mt-2 text-sm text-blue-600">
                  {upcomingEvents} upcoming events
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-700">Total Attendees</CardTitle>
                <CardDescription>Across all events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-10 w-10 text-blue-600 mr-4" />
                  <div className="text-3xl font-bold">{totalAttendees}</div>
                </div>
                <div className="mt-2 text-sm text-blue-600">
                  Average {totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0} per event
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-700">Engagement Rate</CardTitle>
                <CardDescription>User activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="h-10 w-10 text-blue-600 mr-4" />
                  <div className="text-3xl font-bold">82%</div>
                </div>
                <div className="mt-2 text-sm text-blue-600">
                  15% increase from last month
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Recent Registrations</CardTitle>
              <CardDescription>Latest user sign-ups</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.slice(0, 5).map((reg, idx) => (
                    <TableRow key={reg.id || idx}>
                      <TableCell className="font-medium">User {reg.userId}</TableCell>
                      <TableCell>Event {reg.eventId}</TableCell>
                      <TableCell>{new Date(reg.registeredAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{reg.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {registrations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                        No registrations yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">My Events</CardTitle>
              <CardDescription>All events you've created</CardDescription>
            </CardHeader>
            <CardContent>
              {organizerEvents.length > 0 ? (
                <div className="space-y-4">
                  {organizerEvents.map((event) => (
                    <Card key={event.id} className="border-blue-50 overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="h-full w-full object-cover rounded-l-lg" 
                          />
                        </div>
                        <div className="p-4 md:col-span-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
                              <div className="flex items-center text-gray-600 text-sm mt-1">
                                <Calendar className="h-4 w-4 mr-1" /> {event.date}
                                <span className="mx-2">•</span>
                                <MapPin className="h-4 w-4 mr-1" /> {event.location}
                                <span className="mx-2">•</span>
                                <Users className="h-4 w-4 mr-1" /> {event.attendees} attending
                              </div>
                              <div className="mt-2">
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{event.category}</Badge>
                                <Badge className={`ml-2 ${event.isPast ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                                  {event.isPast ? 'Past' : 'Upcoming'}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEventAction('edit', event.id)}>
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleEventAction('delete', event.id)}>
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-600 mt-3 line-clamp-2">{event.description}</p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="text-sm text-gray-600">
                              Created by: <span className="font-medium">{event.organizer}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" onClick={() => handleEventAction('share', event.id)}>
                                <Share2 className="h-4 w-4 mr-1" /> Share
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No events created yet</h3>
                  <p className="text-gray-500 mb-6">Start creating events to see them listed here</p>
                  <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Create New Event</CardTitle>
              <CardDescription>Fill in the details for your event</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" placeholder="Enter event title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="e.g. Music, Academic, Social" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Event location" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe your event..." className="min-h-[100px]" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="Link to event image" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="Maximum attendees" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="isPast" />
                  <Label htmlFor="isPast">This is a past event</Label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateEvent} className="bg-blue-600 hover:bg-blue-700 w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Event
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Attendees Tab */}
        <TabsContent value="attendees" className="space-y-6">
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Attendee Management</CardTitle>
              <CardDescription>View and manage registrations for your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input placeholder="Search attendees..." className="max-w-sm" />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg, idx) => (
                    <TableRow key={reg.id || idx}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          User {reg.userId}
                        </div>
                      </TableCell>
                      <TableCell>
                        Event {reg.eventId}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(reg.registeredAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{reg.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <InfoIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {registrations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <p className="font-medium">No attendees found</p>
                        <p className="text-sm">Attendees will appear here after they register</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Organizer Profile</CardTitle>
              <CardDescription>Manage your organizer information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="rounded-lg bg-gray-100 border aspect-square flex items-center justify-center">
                    <User className="h-24 w-24 text-gray-400" />
                  </div>
                  <Button variant="outline" className="w-full mt-4">Change Photo</Button>
                </div>
                
                <div className="md:w-3/4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organizerName">Organizer Name</Label>
                      <Input id="organizerName" defaultValue={user?.username || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue={user?.email || ""} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell attendees about yourself or your organization..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="https://your-website.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+1 (123) 456-7890" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Profile</Button>
            </CardFooter>
          </Card>
          
          <Card className="border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Notification Settings</CardTitle>
              <CardDescription>Configure how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-registration">New registrations</Label>
                    <p className="text-gray-500 text-sm">Get notified when someone registers for your event</p>
                  </div>
                  <Switch id="new-registration" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="event-reminders">Event reminders</Label>
                    <p className="text-gray-500 text-sm">Receive reminders before your event starts</p>
                  </div>
                  <Switch id="event-reminders" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="feedback-notifications">Attendee feedback</Label>
                    <p className="text-gray-500 text-sm">Get notified when attendees leave feedback</p>
                  </div>
                  <Switch id="feedback-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}