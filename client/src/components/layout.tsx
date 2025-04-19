import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Calendar, Bell, User, Heart, LogOut } from "lucide-react";
import { User as UserType } from "@shared/schema";

export function Layout({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: user } = useQuery<UserType>({ 
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" })
  });

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  const handleSignOut = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.reload();
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
          <Button variant="ghost" className="text-white md:hidden" onClick={() => handleNavigation("/")}><Home size={18} /></Button>
          <Button variant="ghost" className="text-white md:hidden" onClick={() => handleNavigation("/calendar")}><Calendar size={18} /></Button>
          <Button variant="ghost" className="text-white"><Bell size={18} /></Button>
          
          <div className="relative">
            <Avatar 
              className="cursor-pointer" 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase() || 'MU'}</AvatarFallback>
            </Avatar>

            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-gray-800 border-b">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation("/profile")}
                >
                  <User size={16} className="mr-2" /> Profile
                </Button>

                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigation("/saved")}
                >
                  <Heart size={16} className="mr-2" /> Saved Events
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-2" /> Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <main className="p-4 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}