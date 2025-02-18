import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Shell from "@/components/layout/Shell";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import Symptoms from "@/pages/Symptoms";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/not-found";

// Temporary auth check, replace with actual auth logic
const isAuthenticated = false;

function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <Shell>{children}</Shell>;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        {isAuthenticated ? (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/chat">
        <PrivateRoute>
          <Chat />
        </PrivateRoute>
      </Route>
      <Route path="/symptoms">
        <PrivateRoute>
          <Symptoms />
        </PrivateRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;