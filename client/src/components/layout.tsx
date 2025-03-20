
import { useNavigate } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, Bell } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
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
      <main className="p-4 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
