import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "./lib/auth";
import Shell from "@/components/layout/Shell";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import Symptoms from "@/pages/Symptoms";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/not-found";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <Shell>{children}</Shell>;
}

function Router() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/">
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;