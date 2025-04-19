import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";


type LoginData = {
  username: string;
  password: string;
};

export default function AuthPage() {
  // Initialize all hooks first
  const [_, setLocation] = useLocation();
  const { loginMutation, registerMutation, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { toast } = useToast(); // Added useToast hook

  const loginForm = useForm<LoginData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Use useEffect for redirection instead of doing it during render
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  const onLogin = async (data: LoginData) => {
    try {
      await loginMutation.mutateAsync(data);
      setLocation("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onRegister = async (data: InsertUser) => {
    try {
      await registerMutation.mutateAsync(data);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
      setLocation("/");
    } catch (error: any) {
      // Error handling already done in the mutation's onError
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating account..." : "Register"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="hidden lg:flex flex-1 bg-blue-600 text-white p-8 items-center justify-center">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to Mahidol Event Hub</h1>
          <p className="text-lg mb-6">
            Join our vibrant community and discover exciting events happening around campus.
            Register to start saving your favorite events and managing your registrations.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Browse and register for campus events
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Save your favorite events
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Get notifications for upcoming events
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}