import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Layout, Home, MessageSquare, Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Activity, label: "Symptoms", href: "/symptoms" },
];

function Sidebar({ className = "" }: { className?: string }) {
  const [location] = useLocation();

  return (
    <Card className={`p-4 h-full rounded-none border-r bg-card/80 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Layout className="h-6 w-6 text-primary" />
        <h1 className="font-semibold">LifeSync Health</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:block w-64" />

      {/* Mobile Header with Sheet */}
      <Sheet>
        <div className="md:hidden flex items-center border-b p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-primary" />
            <h1 className="font-semibold">LifeSync Health</h1>
          </div>
        </div>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <main className="flex-1 p-4 md:p-6 overflow-auto pt-0 md:pt-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}