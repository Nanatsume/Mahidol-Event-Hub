import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  UserRound, 
  Mail, 
  Building, 
  GraduationCap, 
  Briefcase, 
  LucideGlobe,
  Calendar,
  BookOpen,
  Bell,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  
  // State for profile form
  const [form, setForm] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    faculty: "Faculty of Science",
    program: "Computer Science",
    year: "3",
    bio: "Computer Science student at Mahidol University with an interest in web development and AI.",
    interests: ["Technology", "Music", "Sports"]
  });

  // State for notification settings
  const [notifications, setNotifications] = useState({
    eventReminders: true,
    newEvents: true,
    registrationUpdates: true,
    friendActivity: false,
    marketing: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (setting: string) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting as keyof typeof notifications]
    });
  };

  const saveProfile = () => {
    // Here you would normally save to the backend
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  const saveNotifications = () => {
    // Here you would normally save to the backend
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved",
    });
  };

  const interests = ["Web Development", "Artificial Intelligence", "Data Science", "Blockchain", "Mobile Apps"];

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8 flex items-center space-x-6">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <AvatarImage src="/api/placeholder/80/80" />
          <AvatarFallback className="bg-blue-600 text-white text-3xl">
            {user?.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-blue-800">{form.fullName || user?.username}</h1>
          <p className="text-gray-600">{form.faculty} • {form.program}</p>
          <div className="flex gap-2 mt-2">
            {form.interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50">{interest}</Badge>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="shadow-md border-blue-100">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details and education information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <UserRound size={16} className="text-blue-500" /> Full Name
                  </Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleFormChange}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-500" /> Email
                  </Label>
                  <Input 
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="Your email address"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faculty" className="flex items-center gap-2">
                    <Building size={16} className="text-blue-500" /> Faculty
                  </Label>
                  <Input 
                    id="faculty"
                    name="faculty"
                    value={form.faculty}
                    onChange={handleFormChange}
                    placeholder="Your faculty"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program" className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-500" /> Program
                  </Label>
                  <Input 
                    id="program"
                    name="program"
                    value={form.program}
                    onChange={handleFormChange}
                    placeholder="Your program of study"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year" className="flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-500" /> Year of Study
                  </Label>
                  <Input 
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={handleFormChange}
                    placeholder="Year of study"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <UserRound size={16} className="text-blue-500" /> Bio
                </Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleFormChange}
                  placeholder="A short bio about yourself"
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <LucideGlobe size={16} className="text-blue-500" /> Interests
                </Label>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant={form.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer ${form.interests.includes(interest) ? 'bg-blue-600' : 'bg-white hover:bg-blue-50'}`}
                      onClick={() => {
                        if (form.interests.includes(interest)) {
                          setForm({...form, interests: form.interests.filter(i => i !== interest)});
                        } else {
                          setForm({...form, interests: [...form.interests, interest]});
                        }
                      }}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveProfile}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>



        <TabsContent value="settings">
          <Card className="shadow-md border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell size={18} className="mr-2 text-blue-500" /> Notification Settings
              </CardTitle>
              <CardDescription>Control what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Event Reminders</h3>
                  <p className="text-sm text-gray-500">Receive reminders before events you're registered for</p>
                </div>
                <Switch
                  checked={notifications.eventReminders}
                  onCheckedChange={() => handleNotificationChange('eventReminders')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Events</h3>
                  <p className="text-sm text-gray-500">Get notified when new events are posted</p>
                </div>
                <Switch
                  checked={notifications.newEvents}
                  onCheckedChange={() => handleNotificationChange('newEvents')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Registration Updates</h3>
                  <p className="text-sm text-gray-500">Updates about your event registrations</p>
                </div>
                <Switch
                  checked={notifications.registrationUpdates}
                  onCheckedChange={() => handleNotificationChange('registrationUpdates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Friend Activity</h3>
                  <p className="text-sm text-gray-500">Notifications when friends register for events</p>
                </div>
                <Switch
                  checked={notifications.friendActivity}
                  onCheckedChange={() => handleNotificationChange('friendActivity')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing & Promotions</h3>
                  <p className="text-sm text-gray-500">Special offers and promotional events</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={() => handleNotificationChange('marketing')}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveNotifications}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}