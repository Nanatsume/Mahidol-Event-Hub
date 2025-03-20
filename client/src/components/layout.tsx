
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Layout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  
  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center bg-blue-600 p-3 text-white sticky top-0 z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Mahidol Event Hub</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-white hidden md:flex"
            onClick={() => handleNavigation("/")}
          >
            <Home className="mr-1" size={18} /> Home
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hidden md:flex"
            onClick={() => handleNavigation("/calendar")}
          >
            <Calendar className="mr-1" size={18} /> Calendar
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hidden md:flex"
            onClick={() => handleNavigation("/register")}
          >
            <Users className="mr-1" size={18} /> My Registrations
          </Button>
          <Button variant="ghost" className="text-white md:hidden" onClick={() => handleNavigation("/")}><Home size={18} /></Button>
          <Button variant="ghost" className="text-white md:hidden" onClick={() => handleNavigation("/calendar")}><Calendar size={18} /></Button>
          <Button variant="ghost" className="text-white md:hidden" onClick={() => handleNavigation("/register")}><Users size={18} /></Button>
          <Button variant="ghost" className="text-white"><Bell size={18} /></Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-4 px-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Search events, categories, locations..." 
              className="flex-1"
            />
            <Button className="bg-blue-600 text-white">
              <Search size={18} />
            </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="default" className="bg-blue-600">All</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">Music</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">Movies</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">Games</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">Academic</Button>
            <Button variant="outline" className="border-blue-600 text-blue-600">Social</Button>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3">Highlighted Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <Badge className="mb-2">Featured</Badge>
                  <h3 className="font-semibold">Winter Music Festival</h3>
                  <p className="text-sm text-gray-500">Dec 25 • Central Stadium</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <Badge className="mb-2">Popular</Badge>
                  <h3 className="font-semibold">Tech Conference 2024</h3>
                  <p className="text-sm text-gray-500">Jan 15 • ICT Building</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
}
