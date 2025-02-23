import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ProfileRegistration from '@/components/profile/ProfileRegistration';
import NotFound from '@/pages/not-found';
import '@/styles/theme.css';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Show profile modal for logged-in users without a profile
      if (user && !localStorage.getItem('userProfile')) {
        setShowProfileModal(true);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="container py-6 px-8 md:px-12 lg:px-16 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/chat" 
              element={user ? <NotFound /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/symptoms" 
              element={user ? <NotFound /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {user && (
          <ProfileRegistration 
            isOpen={showProfileModal} 
            onClose={() => setShowProfileModal(false)} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;