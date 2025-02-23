import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Activity, Heart, Zap, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HealthInsight {
  metric: string;
  value: string;
  trend: "up" | "down" | "neutral";
  analysis: string;
  recommendation: string;
}

export default function HealthMetrics() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setInsights([
        {
          metric: "Heart Rate",
          value: "72 BPM",
          trend: "up",
          analysis: "Your heart rate shows a healthy pattern with optimal recovery periods.",
          recommendation: "Consider incorporating more low-intensity activities for better heart rate variability."
        },
        {
          metric: "Sleep Quality",
          value: "7.5 hrs",
          trend: "neutral",
          analysis: "Your sleep duration is within the recommended range, but quality could be improved.",
          recommendation: "Try maintaining a consistent sleep schedule and reducing screen time before bed."
        },
        {
          metric: "Activity Level",
          value: "High",
          trend: "up",
          analysis: "You've maintained an active lifestyle this week with consistent exercise.",
          recommendation: "Great progress! Mix in some strength training to complement your cardio routine."
        },
        {
          metric: "Stress Level",
          value: "Low",
          trend: "down",
          analysis: "Your stress levels have decreased significantly this week.",
          recommendation: "Continue your mindfulness practices and regular exercise routine."
        }
      ]);
      
      setLoading(false);
    };

    loadData();
  }, []);

  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric);
    setShowAIAnalysis(true);
  };

  if (loading) {
    return (
      <Card className="p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse">
              <div className="h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      {/* Glassmorphism and gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-blue-100/30 to-purple-100/30 dark:from-emerald-900/30 dark:via-blue-900/30 dark:to-purple-900/30 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_50%)]" />
      
      {/* Neural network animation background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="relative p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Overview
            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/50 border border-blue-200/50 dark:border-blue-800/50">
            <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">AI Powered</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleMetricClick(insight.metric)}
              className={cn(
                "group cursor-pointer rounded-xl p-4 relative overflow-hidden",
                "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",
                "border border-gray-200/50 dark:border-gray-700/50",
                "hover:shadow-lg hover:border-blue-500/20 dark:hover:border-blue-400/20",
                "transition-all duration-300"
              )}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/80 transition-colors">
                      {insight.metric === "Heart Rate" ? <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" /> :
                       insight.metric === "Sleep Quality" ? <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" /> :
                       insight.metric === "Activity Level" ? <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> :
                       <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{insight.metric}</h3>
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    insight.trend === "up" ? "text-emerald-600 dark:text-emerald-400" :
                    insight.trend === "down" ? "text-rose-600 dark:text-rose-400" :
                    "text-blue-600 dark:text-blue-400"
                  )}>
                    {insight.value}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {insight.analysis}
                  </p>
                  
                  {/* AI Recommendation preview */}
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50/50 dark:bg-blue-900/30 rounded-lg">
                      <Bot className="w-4 h-4 text-blue-500" />
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive elements */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-blue-500/50"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Analysis Modal */}
        <AnimatePresence>
          {showAIAnalysis && selectedMetric && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    AI Analysis: {selectedMetric}
                  </h3>
                </div>
                <button
                  onClick={() => setShowAIAnalysis(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 space-y-6">
                {/* Detailed analysis content here */}
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Analysis</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {insights.find(i => i.metric === selectedMetric)?.analysis}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                    <h4 className="font-medium text-emerald-700 dark:text-emerald-300 mb-2">AI Recommendation</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {insights.find(i => i.metric === selectedMetric)?.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}