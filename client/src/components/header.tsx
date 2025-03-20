
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, User, Calendar, Heart, LogOut } from "lucide-react";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: user } = useQuery({ queryKey: ["/api/user"] });

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-xl font-bold">Mahidol Event Hub</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white">
            <Bell size={18} />
          </Button>
          
          <div className="relative">
            <Avatar className="cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback>MU</AvatarFallback>
            </Avatar>
            
            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-gray-800 border-b">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2" /> Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <Calendar size={16} className="mr-2" /> My Registrations
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <Heart size={16} className="mr-2" /> Saved Events
                </Button>
                <Button variant="ghost" className="w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <LogOut size={16} className="mr-2" /> Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
