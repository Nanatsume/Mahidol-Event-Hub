import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Bell, 
  User, 
  Calendar, 
  Heart, 
  Home, 
  LogOut, 
  Menu, 
  X,
  BookOpenCheck,
  Clipboard,
  Settings
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLocation("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-white text-xl font-bold tracking-tight">
              Mahidol Event Hub
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              className={`text-white hover:bg-blue-800 ${location === '/' ? 'bg-blue-800' : ''}`}
              onClick={() => handleNavigation("/")}
            >
              <Home size={18} className="mr-2" /> Home
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white hover:bg-blue-800 ${location === '/calendar' ? 'bg-blue-800' : ''}`}
              onClick={() => handleNavigation("/calendar")}
            >
              <Calendar size={18} className="mr-2" /> Calendar
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white hover:bg-blue-800 ${location === '/saved' ? 'bg-blue-800' : ''}`}
              onClick={() => handleNavigation("/saved")}
            >
              <Heart size={18} className="mr-2" /> Saved
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white hover:bg-blue-800 ${location === '/register' ? 'bg-blue-800' : ''}`}
              onClick={() => handleNavigation("/register")}
            >
              <BookOpenCheck size={18} className="mr-2" /> Register
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white hover:bg-blue-800 ${location === '/usability-testing' ? 'bg-blue-800' : ''}`}
              onClick={() => handleNavigation("/usability-testing")}
            >
              <Clipboard size={18} className="mr-2" /> Testing
            </Button>
            <Button 
              variant="ghost" 
              className={`text-white hover:bg-blue-800 ${location === '/organizer-dashboard' ? 'bg-blue-800' : ''}`}
              onClick={() => handleNavigation("/organizer-dashboard")}
            >
              <Settings size={18} className="mr-2" /> Organizer
            </Button>
          </div>

          {/* User Area */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-white hover:bg-blue-800 hidden md:flex">
              <Bell size={18} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              className="text-white hover:bg-blue-800 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Avatar className="ring-2 ring-white/30 hover:ring-white/80 transition-all">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback className="bg-blue-900 text-white">
                    {user?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 text-white font-medium hidden md:block">
                  {user?.username}
                </span>
              </div>

              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-10 border border-gray-100 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                    <p className="font-bold text-blue-800">{user.username}</p>
                    <p className="text-sm text-blue-600">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <Button variant="ghost" className="w-full justify-start px-4 py-2.5 text-gray-700 hover:bg-blue-50">
                      <User size={18} className="mr-3 text-blue-500" /> My Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-2.5 text-gray-700 hover:bg-blue-50"
                      onClick={() => {
                        handleNavigation("/register");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <BookOpenCheck size={18} className="mr-3 text-blue-500" /> My Registrations
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-4 py-2.5 text-gray-700 hover:bg-blue-50"
                      onClick={() => {
                        handleNavigation("/saved");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Heart size={18} className="mr-3 text-blue-500" /> Saved Events
                    </Button>
                  </div>
                  <div className="pt-1 pb-2 px-4 border-t">
                    <Button 
                      variant="destructive" 
                      className="w-full justify-center mt-1 bg-red-500 hover:bg-red-600"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut size={16} className="mr-2" /> 
                      {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800 mt-3 rounded-lg p-2 shadow-lg">
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-blue-700 ${location === '/' ? 'bg-blue-700' : ''} mb-1`}
              onClick={() => handleNavigation("/")}
            >
              <Home size={18} className="mr-2" /> Home
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-blue-700 ${location === '/calendar' ? 'bg-blue-700' : ''} mb-1`}
              onClick={() => handleNavigation("/calendar")}
            >
              <Calendar size={18} className="mr-2" /> Calendar
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-blue-700 ${location === '/saved' ? 'bg-blue-700' : ''} mb-1`}
              onClick={() => handleNavigation("/saved")}
            >
              <Heart size={18} className="mr-2" /> Saved Events
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-blue-700 ${location === '/register' ? 'bg-blue-700' : ''} mb-1`}
              onClick={() => handleNavigation("/register")}
            >
              <BookOpenCheck size={18} className="mr-2" /> Event Registration
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-blue-700 ${location === '/usability-testing' ? 'bg-blue-700' : ''} mb-1`}
              onClick={() => handleNavigation("/usability-testing")}
            >
              <Clipboard size={18} className="mr-2" /> Usability Testing
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-white hover:bg-blue-700 ${location === '/organizer-dashboard' ? 'bg-blue-700' : ''}`}
              onClick={() => handleNavigation("/organizer-dashboard")}
            >
              <Settings size={18} className="mr-2" /> Organizer Dashboard
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}