import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Users, Bell } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}