import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Home,
  LayoutDashboard, 
  MessageSquare, 
  Activity,
  UserCircle, 
  Sun, 
  Moon,
  LogOut,
  LogIn
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove('dark-theme');
      setIsDarkTheme(false);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = !isDarkTheme;
    if (newTheme) {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
    setIsDarkTheme(newTheme);
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setShowProfileModal(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userProfile'); // Clear user profile from local storage
      navigate('/'); // Redirect to home page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const ProfileModal = () => {
    const [formData, setFormData] = useState<UserProfile>(
      userProfile || {
        name: '',
        age: 0,
        height: 0,
        weight: 0,
        gender: 'male'
      }
    );

    return (
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">Personal Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Gender</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'male' })}
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.gender === 'male'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src="/avatars/male-avatar.png" alt="Male Avatar" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Male</span>
                  {formData.gender === 'male' && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'female' })}
                  className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.gender === 'female'
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-pink-400 dark:hover:border-pink-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src="/avatars/female-avatar.png" alt="Female Avatar" />
                    <AvatarFallback>F</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Female</span>
                  {formData.gender === 'female' && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-pink-500 rounded-full" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium text-gray-700 dark:text-gray-200">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Years"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium text-gray-700 dark:text-gray-200">Weight</Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 pr-12"
                    placeholder="0.0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">kg</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height" className="text-sm font-medium text-gray-700 dark:text-gray-200">Height</Label>
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    step="0.01"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 pr-12"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">m</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => handleProfileUpdate(formData)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 mt-4"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-lg sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-8 md:px-12 lg:px-16 max-w-6xl mx-auto">
          {/* Logo */}
          <div>
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-cyan-600 transition-all duration-300">
                LifeSync
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-200 relative group rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <span className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-200 relative group rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>

                <Link 
                  to="/chat" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-200 relative group rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>

                <Link 
                  to="/symptoms" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors dark:text-gray-200 relative group rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <span>Symptoms</span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-4 relative group">
                      {userProfile?.gender ? (
                        <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-blue-500/50 dark:ring-blue-400/50 group-hover:ring-blue-600 dark:group-hover:ring-blue-500 transition-all duration-300">
                          <AvatarImage 
                            src={`/avatars/${userProfile.gender}-avatar.png`} 
                            alt="Profile Avatar" 
                          />
                          <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                            {userProfile.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <UserCircle className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
                    {userProfile && (
                      <>
                        <DropdownMenuLabel className="font-normal px-4 py-3">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              Age: {userProfile.age}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                      </>
                    )}

                    <DropdownMenuItem 
                      className="cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 flex items-center"
                      onClick={() => setShowProfileModal(true)}
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      Personal Details
                    </DropdownMenuItem>

                    <DropdownMenuItem 
                      className="cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors px-4 py-2 flex items-center group"
                      onClick={toggleTheme}
                    >
                      {isDarkTheme ? (
                        <Sun className="w-4 h-4 mr-2 text-yellow-500 transition-transform group-hover:rotate-45" />
                      ) : (
                        <Moon className="w-4 h-4 mr-2 text-gray-700 dark:text-gray-200 transition-transform group-hover:-rotate-12" />
                      )}
                      Theme: {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors px-4 py-2 flex items-center"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
      
      {user && <ProfileModal />}
    </>
  );
};

export default Navbar; 