import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HealthMetrics from "@/components/dashboard/HealthMetrics";
import MoodTracker from "@/components/dashboard/MoodTracker";
import { MessageSquareText, Stethoscope, Sun, Moon, Cloud, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { auth } from '@/lib/firebase';

export default function Home() {
  const [firstName, setFirstName] = useState<string>("");
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay("morning");
    else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
    else if (hour >= 17 && hour < 21) setTimeOfDay("evening");
    else setTimeOfDay("night");

    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const { name } = JSON.parse(userProfile);
      const firstWord = name.split(' ')[0];
      setFirstName(firstWord);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const getTimeIcon = () => {
    switch (timeOfDay) {
      case "morning": return <Sun className="h-8 w-8 text-amber-500 animate-spin-slow" />;
      case "afternoon": return <Sun className="h-8 w-8 text-orange-500 animate-spin-slow" />;
      case "evening": return <Cloud className="h-8 w-8 text-indigo-500 animate-pulse" />;
      case "night": return <Moon className="h-8 w-8 text-blue-500 animate-pulse" />;
    }
  };

  const getGreeting = () => {
    switch (timeOfDay) {
      case "morning": return "Good Morning";
      case "afternoon": return "Good Afternoon";
      case "evening": return "Good Evening";
      case "night": return "Good Night";
    }
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to LifeSync
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your personal health and wellness companion
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <Button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-medium"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
            className="px-8 py-6 text-lg font-medium border-2"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Sign Up
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 -z-10 animate-gradient-shift"></div>

      {/* Welcome Section */}
      <AnimatePresence mode="wait">
        {mounted && (
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              {getTimeIcon()}
              <motion.h1 
                className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {getGreeting()}{firstName ? `, ${firstName}` : ''}
              </motion.h1>
            </div>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Track your mood and monitor your health metrics
            </motion.p>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="grid gap-8 lg:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MoodTracker />
        <HealthMetrics />
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 p-px shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => navigate('/chat')}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 transition-colors duration-300 group-hover:bg-opacity-90 dark:group-hover:bg-opacity-90">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-blue-900 dark:group-hover:to-indigo-900">
                <MessageSquareText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Chat with AI Assistant
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Get instant health advice and support
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border border-blue-500/20 dark:border-blue-400/20 rounded-2xl group-hover:border-blue-500/40 dark:group-hover:border-blue-400/40 transition-colors"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 p-px shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => navigate('/symptoms')}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 transition-colors duration-300 group-hover:bg-opacity-90 dark:group-hover:bg-opacity-90">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 group-hover:from-emerald-200 group-hover:to-teal-200 dark:group-hover:from-emerald-900 dark:group-hover:to-teal-900">
                <Stethoscope className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Symptom Checker
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Analyze your symptoms and get recommendations
                </p>
              </div>
            </div>
            <div className="absolute inset-0 border border-emerald-500/20 dark:border-emerald-400/20 rounded-2xl group-hover:border-emerald-500/40 dark:group-hover:border-emerald-400/40 transition-colors"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
} 