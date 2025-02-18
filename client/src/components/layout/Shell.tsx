import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { Layout, Home, MessageSquare, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Activity, label: "Symptoms", href: "/symptoms" },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-background">
      <Card className="w-64 p-4 rounded-none border-r">
        <div className="flex items-center gap-2 mb-6">
          <Layout className="h-6 w-6" />
          <h1 className="font-semibold">LifeSync Health</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </Card>
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
