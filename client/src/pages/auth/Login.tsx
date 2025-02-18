import { useState } from "react";
import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, mode: "signin" | "signup") => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      toast({
        title: mode === "signin" ? "Welcome back!" : "Account created",
        description: mode === "signin" 
          ? "You've been successfully logged in"
          : "Your account has been created and you're now logged in",
      });
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6 space-y-6">
        <div className="flex flex-col items-center space-y-2 mb-4">
          <Activity className="h-12 w-12 text-primary" />
          <h1 className="text-2xl font-bold">Welcome to LifeSync</h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={(e) => handleSubmit(e, "signin")} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="space-y-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isLoading}
              onClick={(e) => handleSubmit(e, "signup")}
            >
              Create Account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}