import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MahidolEventPlatform from "@/pages/mahidol-event-platform";
import Calendar from "@/pages/calendar";
import AuthPage from "@/pages/auth-page";
import SavedEvents from "@/pages/saved-events";
import UsabilityTesting from "@/pages/usability-testing";
import OrganizerDashboard from "@/pages/organizer-dashboard";
import Profile from "@/pages/profile";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Layout>
        <Switch>
          <ProtectedRoute path="/" component={() => <MahidolEventPlatform />} />
          <ProtectedRoute path="/calendar" component={Calendar} />
          <ProtectedRoute path="/saved" component={SavedEvents} />
          <ProtectedRoute path="/usability-testing" component={UsabilityTesting} />
          <ProtectedRoute path="/organizer-dashboard" component={OrganizerDashboard} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
