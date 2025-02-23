import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { setTheme, type MoodType } from "@/lib/theme";
import { Sun, Cloud, CloudRain, Smile, Zap, Frown, Meh, Heart, PartyPopper, Brain, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const moodConfig = {
  happy: { 
    icon: Sun, 
    label: "Happy", 
    color: "text-yellow-500",
    gradient: "from-yellow-400 to-orange-500",
    message: "Your joy brightens everyone's day! Keep smiling! 🌟",
    suggestion: "Why not share your happiness by doing something nice for someone?",
    aiAnalysis: {
      patterns: "Your mood patterns show consistent positivity, especially in the mornings.",
      insights: "Happy moods often correlate with your physical activity levels.",
      activities: ["Call a friend", "Start a creative project", "Plan a fun weekend activity"],
      musicMood: "Upbeat and energetic music recommended",
      wellnessScore: 95
    }
  },
  sad: { 
    icon: CloudRain, 
    label: "Sad", 
    color: "text-blue-500",
    gradient: "from-blue-400 to-indigo-500",
    message: "It's okay to feel down. Tomorrow brings new possibilities! 🌧️",
    suggestion: "Consider talking to a friend or doing something you enjoy.",
    aiAnalysis: {
      patterns: "Your sad moods tend to be temporary and often improve with social interaction.",
      insights: "There's a correlation between these moments and your sleep patterns.",
      activities: ["Gentle walking", "Journaling", "Mindful breathing exercises"],
      musicMood: "Calming and soothing melodies recommended",
      wellnessScore: 75
    }
  },
  anxious: { 
    icon: Cloud, 
    label: "Anxious", 
    color: "text-green-500",
    gradient: "from-green-400 to-emerald-500",
    message: "Take deep breaths. You've got this! 🍃",
    suggestion: "Try some mindful breathing exercises or a short walk.",
    aiAnalysis: {
      patterns: "Anxiety peaks tend to occur during high-activity periods.",
      insights: "Regular exercise has shown to help reduce your anxiety levels.",
      activities: ["5-minute meditation", "Progressive muscle relaxation", "Nature walk"],
      musicMood: "Ambient and peaceful tracks recommended",
      wellnessScore: 80
    }
  },
  neutral: { 
    icon: Smile, 
    label: "Neutral", 
    color: "text-purple-500",
    gradient: "from-purple-400 to-pink-500",
    message: "Finding balance in the everyday moments. ⚖️",
    suggestion: "Maybe try something new today to spark some excitement?",
    aiAnalysis: {
      patterns: "Your neutral moods often transition to positive with engagement in activities.",
      insights: "These moments are great opportunities for trying new things.",
      activities: ["Try a new hobby", "Learn something new", "Explore your local area"],
      musicMood: "Balanced mix of upbeat and calm music recommended",
      wellnessScore: 85
    }
  },
  energetic: { 
    icon: Zap, 
    label: "Energetic", 
    color: "text-red-500",
    gradient: "from-red-400 to-rose-500",
    message: "Your energy is contagious! Channel it wisely! ⚡",
    suggestion: "Great time for exercise or tackling that project you've been planning!",
    aiAnalysis: {
      patterns: "Peak energy levels align well with your productivity phases.",
      insights: "Physical activity during these times shows excellent results.",
      activities: ["High-intensity workout", "Tackle challenging tasks", "Creative projects"],
      musicMood: "High-energy and motivating tracks recommended",
      wellnessScore: 90
    }
  }
} as const;

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState([5]);
  const [note, setNote] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState<{message: string, suggestion: string} | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [aiInsightStage, setAiInsightStage] = useState(0);

  const simulateAIAnalysis = async (mood: string) => {
    setAiThinking(true);
    setAiResponse(null);
    setShowDetailedAnalysis(false);
    setAiInsightStage(0);
    
    // Simulate AI processing with progressive insights
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAiInsightStage(1); // Pattern Analysis
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setAiInsightStage(2); // Mood Correlation
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setAiInsightStage(3); // Activity Suggestions
    
    await new Promise(resolve => setTimeout(resolve, 400));
    setAiInsightStage(4); // Final Analysis
    
    const moodInfo = moodConfig[mood as keyof typeof moodConfig];
    setAiResponse({
      message: moodInfo.message,
      suggestion: moodInfo.suggestion
    });
    
    setAiThinking(false);
    setShowDetailedAnalysis(true);
  };

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    setShowConfetti(true);
    setTheme(mood as MoodType);
    await simulateAIAnalysis(mood);

    // Reset confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] bg-white/80 dark:bg-gray-800/80">
        {/* Glassmorphism background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_50%)]" />
        
        {/* Animated grain texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] animate-[grain_8s_steps(10)_infinite]" />
        </div>

        {/* Confetti Effect */}
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg"
                initial={{
                  top: "50%",
                  left: "50%",
                  scale: 0,
                  opacity: 1
                }}
                animate={{
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  scale: Math.random() * 2,
                  opacity: 0
                }}
                transition={{
                  duration: 1 + Math.random() * 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.2
                }}
              />
            ))}
          </motion.div>
        )}

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              How are you feeling?
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
            </h2>
            {selectedMood && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/50 border border-blue-200/50 dark:border-blue-800/50">
                <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Analysis Active</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {(Object.entries(moodConfig) as [MoodType, typeof moodConfig.happy][]).map(([mood, config]) => {
              const Icon = config.icon;
              const isSelected = selectedMood === mood;
              
              return (
                <motion.div
                  key={mood}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleMoodSelect(mood)}
                    className={cn(
                      "flex-col gap-2 h-auto py-6 w-full relative overflow-hidden group",
                      "border-2 shadow-lg transition-all duration-300",
                      "hover:shadow-2xl hover:border-opacity-50",
                      isSelected ? "bg-gradient-to-br shadow-lg border-transparent" : "hover:border-blue-500/20 dark:hover:border-blue-400/20",
                      isSelected && config.gradient,
                      "backdrop-blur-sm"
                    )}
                  >
                    <motion.div
                      animate={isSelected ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <Icon className={cn(
                        "h-8 w-8",
                        isSelected ? "text-white" : config.color,
                        "transform transition-all duration-300 group-hover:scale-110"
                      )} />
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 blur-sm opacity-50"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                    <span className={cn(
                      "capitalize font-semibold mt-2",
                      isSelected ? "text-white" : "text-gray-700 dark:text-gray-200"
                    )}>
                      {config.label}
                    </span>
                    
                    {/* Enhanced ripple effect */}
                    {isSelected && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ scale: 0, opacity: 0.5 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          animate={{
                            x: ["0%", "100%"],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        />
                      </>
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced AI Analysis Section */}
          <AnimatePresence mode="wait">
            {aiThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-6 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-6 h-6 text-blue-500" />
                    </motion.div>
                    <span className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                      AI is analyzing your mood...
                    </span>
                  </div>

                  {/* Progressive Analysis Stages */}
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: aiInsightStage >= 1 ? 1 : 0, x: aiInsightStage >= 1 ? 0 : -20 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Analyzing mood patterns...</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: aiInsightStage >= 2 ? 1 : 0, x: aiInsightStage >= 2 ? 0 : -20 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Correlating with health metrics...</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: aiInsightStage >= 3 ? 1 : 0, x: aiInsightStage >= 3 ? 0 : -20 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Generating personalized suggestions...</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: aiInsightStage >= 4 ? 1 : 0, x: aiInsightStage >= 4 ? 0 : -20 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Finalizing mood analysis...</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {showDetailedAnalysis && selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-4"
              >
                {/* AI Analysis Card */}
                <div className="p-6 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg backdrop-blur-sm">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-blue-500" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          AI Mood Analysis
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          Wellness Score:
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {moodConfig[selectedMood as keyof typeof moodConfig].aiAnalysis.wellnessScore}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Pattern Analysis</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {moodConfig[selectedMood as keyof typeof moodConfig].aiAnalysis.patterns}
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Insights</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {moodConfig[selectedMood as keyof typeof moodConfig].aiAnalysis.insights}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Recommended Activities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {moodConfig[selectedMood as keyof typeof moodConfig].aiAnalysis.activities.map((activity, index) => (
                          <motion.div
                            key={activity}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-2 bg-blue-50/50 dark:bg-blue-900/30 rounded-lg text-sm text-gray-600 dark:text-gray-300 text-center"
                          >
                            {activity}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Music Recommendation:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {moodConfig[selectedMood as keyof typeof moodConfig].aiAnalysis.musicMood}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rest of the component with enhanced styling */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-4 text-gray-700 dark:text-gray-200">
                Intensity - {intensity[0]}/10
              </label>
              <div className="relative py-5">
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 dark:from-blue-900 dark:via-blue-700 dark:to-blue-500 rounded-full shadow-inner"></div>
                <Slider
                  value={intensity}
                  onValueChange={setIntensity}
                  max={10}
                  step={1}
                  className={cn(
                    "relative z-10",
                    "[&_[role=slider]]:h-5",
                    "[&_[role=slider]]:w-5",
                    "[&_[role=slider]]:bg-gradient-to-br",
                    "[&_[role=slider]]:from-blue-500",
                    "[&_[role=slider]]:to-blue-600",
                    "[&_[role=slider]]:dark:from-blue-400",
                    "[&_[role=slider]]:dark:to-blue-500",
                    "[&_[role=slider]]:border-2",
                    "[&_[role=slider]]:border-white",
                    "[&_[role=slider]]:dark:border-gray-800",
                    "[&_[role=slider]]:shadow-lg",
                    "[&_[role=slider]]:transition-transform",
                    "[&_[role=slider]]:duration-200",
                    "[&_[role=slider]]:hover:scale-110",
                    "[&_[role=slider]]:focus:scale-110",
                    "[&_[role=slider]]:focus:ring-2",
                    "[&_[role=slider]]:focus:ring-blue-500",
                    "[&_[role=slider]]:focus:ring-offset-2",
                    "[&_[role=slider]]:focus:ring-offset-white",
                    "[&_[role=slider]]:dark:focus:ring-offset-gray-900",
                  )}
                />
                <div className="mt-2 flex justify-between px-1">
                  {Array.from({ length: 11 }, (_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex flex-col items-center",
                        intensity[0] === i && "text-blue-600 dark:text-blue-400 font-medium scale-110 transition-transform"
                      )}
                    >
                      <div className={cn(
                        "h-1 w-1 rounded-full mb-1",
                        intensity[0] === i ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
                      )} />
                      <span className="text-xs">{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                What's on your mind?
              </label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any notes about how you're feeling..."
                className="min-h-[120px] resize-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300" 
              size="lg"
            >
              Save Mood
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}