import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MahidolEventPlatform from "@/pages/mahidol-event-platform";
import Calendar from "@/pages/calendar";
import Register from "@/pages/register";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={MahidolEventPlatform} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/register" component={Register} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
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