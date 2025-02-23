import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  Send, 
  Brain, 
  Sparkles, 
  Activity, 
  Heart, 
  Stethoscope,
  AlertCircle,
  Loader2,
  MessageSquare,
  PlusCircle,
  Wand2,
  Zap,
  Lightbulb,
  Syringe,
  Pill,
  Waves
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  category?: "general" | "symptoms" | "exercise" | "alert" | "recommendation" | "analysis" | "treatment";
  thinking?: boolean;
  analysis?: {
    sentiment: number;
    keywords: string[];
    severity?: "low" | "medium" | "high";
    confidence: number;
    medicalContext?: string[];
    suggestedActions?: string[];
  };
  aiFeatures?: {
    emotionDetection?: string;
    riskLevel?: "low" | "moderate" | "high";
    confidenceScore?: number;
    suggestedSpecialists?: string[];
    treatmentApproach?: string;
    followUpQuestions?: string[];
  };
}

// Enhanced knowledge base with more detailed medical information
const healthKnowledgeBase = {
  anxiety: {
    symptoms: ["restlessness", "rapid heartbeat", "excessive worry", "difficulty concentrating", "sleep disturbances", "muscle tension"],
    recommendations: [
      "Practice deep breathing exercises - 4-7-8 technique",
      "Progressive muscle relaxation - 15 minutes daily",
      "Regular physical activity - 30 minutes of moderate exercise",
      "Mindfulness meditation - guided sessions",
      "Cognitive Behavioral Therapy techniques",
      "Stress management through time-boxing"
    ],
    severity: {
      mild: "Self-management techniques and lifestyle changes. Monitor symptoms for 2 weeks.",
      moderate: "Consider counseling or therapy. Combination of self-help and professional support recommended.",
      severe: "Urgent consultation with a mental health professional. May require comprehensive treatment plan."
    },
    who_guidelines: "WHO recommends a stepped care approach, starting with self-help and lifestyle changes before moving to professional interventions. Regular monitoring and adjustment of interventions based on response.",
    specialists: ["Psychiatrist", "Clinical Psychologist", "Cognitive Behavioral Therapist"],
    treatment_approaches: ["Cognitive Behavioral Therapy", "Exposure Therapy", "Mindfulness-Based Stress Reduction", "Medication (if prescribed by healthcare provider)"]
  },
  depression: {
    symptoms: ["persistent sadness", "loss of interest", "sleep changes", "fatigue", "concentration difficulties", "appetite changes", "feelings of worthlessness"],
    recommendations: [
      "Maintain regular sleep schedule - 7-9 hours daily",
      "Exercise regularly - start with 10-minute walks",
      "Stay connected with support system",
      "Structure daily activities and set small goals",
      "Practice gratitude journaling",
      "Engage in enjoyable activities daily"
    ],
    severity: {
      mild: "Self-help strategies and lifestyle modifications. Monitor mood daily.",
      moderate: "Psychological interventions recommended. Consider combination therapy.",
      severe: "Immediate professional intervention required. Combined therapy and medication evaluation."
    },
    who_guidelines: "WHO emphasizes early intervention and combining psychological support with social support systems. Regular assessment of suicide risk and safety planning when necessary.",
    specialists: ["Psychiatrist", "Clinical Psychologist", "Licensed Therapist"],
    treatment_approaches: ["Psychotherapy", "Cognitive Behavioral Therapy", "Interpersonal Therapy", "Medication Management"]
  },
  stress: {
    symptoms: ["tension", "irritability", "difficulty sleeping", "concentration problems", "physical symptoms", "emotional exhaustion"],
    recommendations: [
      "Time management techniques - Priority matrix",
      "Regular exercise - 150 minutes per week",
      "Stress-reduction activities - Progressive relaxation",
      "Healthy work-life balance strategies",
      "Social support engagement",
      "Nature exposure - 20 minutes daily"
    ],
    severity: {
      mild: "Lifestyle modifications and self-help techniques. Review stressors weekly.",
      moderate: "Consider stress management programs and counseling support.",
      severe: "Professional intervention recommended. Comprehensive stress management plan needed."
    },
    who_guidelines: "WHO recommends addressing both individual and environmental factors contributing to stress. Focus on sustainable lifestyle changes and building resilience.",
    specialists: ["Stress Management Counselor", "Occupational Therapist", "Clinical Psychologist"],
    treatment_approaches: ["Stress Management Training", "Lifestyle Modification", "Relaxation Techniques", "Cognitive Restructuring"]
  }
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hello! I'm your advanced AI health assistant powered by sophisticated natural language processing and medical knowledge systems. I can provide detailed symptom analysis, evidence-based recommendations, and personalized health insights. How are you feeling today?",
      category: "general",
      aiFeatures: {
        emotionDetection: "neutral",
        confidenceScore: 0.95,
        followUpQuestions: [
          "Would you like to discuss any specific health concerns?",
          "Shall we start with a quick health assessment?",
          "Would you prefer general wellness advice?"
        ]
      }
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [aiAnalysisStage, setAiAnalysisStage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced text analysis with medical context
  const analyzeText = (text: string) => {
    const keywords = text.toLowerCase().split(' ');
    const sentimentWords = {
      positive: ['good', 'better', 'great', 'happy', 'confident', 'improving', 'hopeful'],
      negative: ['bad', 'worse', 'terrible', 'sad', 'anxious', 'stressed', 'depressed', 'worried', 'afraid']
    };

    let sentiment = 0;
    let matchedKeywords: string[] = [];
    let severity: "low" | "medium" | "high" = "low";
    let medicalContext: string[] = [];

    // Enhanced sentiment analysis
    keywords.forEach(word => {
      if (sentimentWords.positive.includes(word)) sentiment += 1;
      if (sentimentWords.negative.includes(word)) sentiment -= 1;
    });

    // Advanced keyword matching with medical context
    Object.entries(healthKnowledgeBase).forEach(([condition, data]) => {
      data.symptoms.forEach(symptom => {
        if (text.toLowerCase().includes(symptom.toLowerCase())) {
          matchedKeywords.push(symptom);
          medicalContext.push(`Symptom associated with ${condition}`);
        }
      });
    });

    // Sophisticated severity assessment
    const severityIndicators = {
      high: ['severe', 'extreme', 'very', 'constantly', 'always', 'unbearable'],
      medium: ['moderate', 'sometimes', 'often', 'frequent'],
      low: ['mild', 'occasionally', 'slightly', 'rare']
    };

    if (keywords.some(word => severityIndicators.high.includes(word))) severity = "high";
    else if (keywords.some(word => severityIndicators.medium.includes(word))) severity = "medium";

    return {
      sentiment: sentiment,
      keywords: matchedKeywords,
      severity: severity,
      confidence: Math.min(matchedKeywords.length * 0.2 + 0.3, 0.9),
      medicalContext: medicalContext
    };
  };

  const generateAIResponse = async (userMessage: string, analysis: any) => {
    setAiAnalysisStage(1); // Start analysis
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setAiAnalysisStage(2); // Processing medical context
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setAiAnalysisStage(3); // Generating recommendations
    await new Promise(resolve => setTimeout(resolve, 400));

    let response: Message = {
      id: Date.now().toString(),
      type: "bot",
      content: "",
      category: "general",
      analysis: analysis,
      aiFeatures: {
        emotionDetection: analysis.sentiment > 0 ? "positive" : analysis.sentiment < 0 ? "negative" : "neutral",
        riskLevel: analysis.severity,
        confidenceScore: analysis.confidence,
        suggestedSpecialists: [],
        treatmentApproach: "",
        followUpQuestions: []
      }
    };

    // Match symptoms with conditions and generate comprehensive response
    const matchedConditions = Object.entries(healthKnowledgeBase).filter(([condition, data]) => {
      return data.symptoms.some(symptom => 
        userMessage.toLowerCase().includes(symptom.toLowerCase())
      );
    });

    if (matchedConditions.length > 0) {
      const [condition, data] = matchedConditions[0];
      const severity = analysis.severity;
      
      response = {
        id: Date.now().toString(),
        type: "bot",
        content: `Based on my comprehensive analysis, I've identified symptoms associated with ${condition}.\n\n${data.who_guidelines}\n\n${data.severity[severity]}\n\nRecommended actions:\n${data.recommendations.map(rec => `• ${rec}`).join('\n')}\n\nSuggested specialists to consult:\n${data.specialists.map(spec => `• ${spec}`).join('\n')}`,
        category: "symptoms",
        analysis: analysis,
        aiFeatures: {
          emotionDetection: analysis.sentiment > 0 ? "positive" : analysis.sentiment < 0 ? "negative" : "neutral",
          riskLevel: severity,
          confidenceScore: analysis.confidence,
          suggestedSpecialists: data.specialists,
          treatmentApproach: data.treatment_approaches.join(", "),
          followUpQuestions: [
            "Would you like more information about any of these recommendations?",
            "Shall we discuss specific treatment approaches in detail?",
            "Would you like help finding specialists in your area?"
          ]
        }
      };

      // Add detailed analysis message
      const analysisMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `Detailed Analysis:\n• Confidence Score: ${(analysis.confidence * 100).toFixed(1)}%\n• Risk Level: ${severity}\n• Recommended Approach: ${data.treatment_approaches[0]}\n\nWould you like to:\n1. Explore treatment options in detail\n2. Get a personalized management plan\n3. Learn about coping strategies\n4. Connect with healthcare providers`,
        category: "analysis"
      };

      setMessages(prev => [...prev, response, analysisMessage]);
      return;
    }

    // Enhanced exercise and wellness responses
    if (userMessage.toLowerCase().includes('exercise') || userMessage.toLowerCase().includes('workout')) {
      response = {
        id: Date.now().toString(),
        type: "bot",
        content: `Based on WHO guidelines and your profile, here's a personalized exercise recommendation:\n\n${
          userProfile?.age > 60 
            ? '• Moderate intensity activities: 150-300 minutes weekly\n• Balance and fall-prevention exercises: 3 times weekly\n• Muscle-strengthening: 2-3 sessions weekly\n• Flexibility training: Daily gentle stretching'
            : '• Cardio: 150 minutes moderate or 75 minutes vigorous activity weekly\n• Strength training: 2-3 sessions targeting major muscle groups\n• Flexibility work: 10-15 minutes daily\n• High-Intensity Interval Training: 1-2 sessions weekly'
        }\n\nWould you like a detailed exercise plan tailored to your specific needs and goals?`,
        category: "exercise",
        analysis: analysis,
        aiFeatures: {
          confidenceScore: 0.95,
          followUpQuestions: [
            "Would you like a day-by-day exercise schedule?",
            "Shall we focus on any specific fitness goals?",
            "Would you like to learn about proper exercise techniques?"
          ]
        }
      };
    }

    // Enhanced mental health support
    if (analysis.sentiment < 0) {
      response = {
        id: Date.now().toString(),
        type: "bot",
        content: "I notice you might be experiencing some emotional challenges. Here's a comprehensive support approach:\n\n• Immediate Support:\n  - Deep breathing exercise (4-7-8 technique)\n  - Grounding techniques\n  - Mindfulness meditation\n\n• Short-term Actions:\n  - Connect with support system\n  - Maintain routine and sleep schedule\n  - Engage in physical activity\n\n• Professional Support:\n  - Consider speaking with a mental health professional\n  - Crisis helpline available 24/7\n  - Support groups in your area\n\nWould you like me to provide more specific resources or guide you through a calming exercise?",
        category: "alert",
        analysis: analysis,
        aiFeatures: {
          emotionDetection: "concerned",
          riskLevel: "moderate",
          confidenceScore: 0.85,
          suggestedSpecialists: ["Therapist", "Counselor", "Clinical Psychologist"],
          followUpQuestions: [
            "Would you like to try a guided breathing exercise?",
            "Shall we explore coping strategies together?",
            "Would you like information about professional support services?"
          ]
        }
      };
    }

    setMessages(prev => [...prev, response]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isThinking) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: input
      };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsThinking(true);
      setAiAnalysisStage(0);

      // Simulate AI processing
      const analysis = analyzeText(userMessage.content);
      await generateAIResponse(userMessage.content, analysis);
      
      setIsThinking(false);
      setAiAnalysisStage(0);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl p-4"
    >
      <Card className="relative overflow-hidden backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_50%)]" />
        
        {/* Neural network animation background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        {/* Enhanced Header */}
        <div className="relative border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg blur-xl animate-pulse"></div>
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Health Assistant</h2>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Brain className="w-4 h-4" />
                    Advanced AI
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Stethoscope className="w-4 h-4" />
                    Medical Knowledge
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-400/10 dark:to-blue-400/10 border border-emerald-500/20 dark:border-emerald-400/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
          </div>
        </div>

        {/* Messages Container with enhanced styling */}
        <div className="relative h-[600px] overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  {message.type === "bot" ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg blur-lg"></div>
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-500/20 dark:bg-purple-400/20 rounded-lg blur-lg"></div>
                      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-white shadow-lg"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 shadow-lg"
                    } ${
                      message.category === "alert"
                        ? "border-l-4 border-red-500 dark:border-red-400"
                        : message.category === "exercise"
                        ? "border-l-4 border-emerald-500 dark:border-emerald-400"
                        : message.category === "symptoms"
                        ? "border-l-4 border-yellow-500 dark:border-yellow-400"
                        : message.category === "analysis"
                        ? "border-l-4 border-blue-500 dark:border-blue-400"
                        : ""
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Enhanced message footer with AI features */}
                    {message.category && message.type === "bot" && (
                      <div className="mt-3 pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
                        <div className="flex items-center gap-2 flex-wrap">
                          {message.category === "alert" && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs">
                              <AlertCircle className="w-3 h-3" />
                              <span>Priority Alert</span>
                            </div>
                          )}
                          {message.category === "exercise" && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs">
                              <Activity className="w-3 h-3" />
                              <span>Exercise Plan</span>
                            </div>
                          )}
                          {message.category === "symptoms" && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs">
                              <Stethoscope className="w-3 h-3" />
                              <span>Medical Analysis</span>
                            </div>
                          )}
                          {message.category === "analysis" && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs">
                              <Brain className="w-3 h-3" />
                              <span>AI Insight</span>
                            </div>
                          )}
                          
                          {message.aiFeatures?.confidenceScore && (
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs">
                              <Sparkles className="w-3 h-3" />
                              <span>{(message.aiFeatures.confidenceScore * 100).toFixed(0)}% Confidence</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Enhanced thinking animation */}
            {isThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg blur-lg animate-pulse"></div>
                    <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center">
                      {aiAnalysisStage === 0 && <Loader2 className="w-5 h-5 text-white animate-spin" />}
                      {aiAnalysisStage === 1 && <Brain className="w-5 h-5 text-white animate-pulse" />}
                      {aiAnalysisStage === 2 && <Stethoscope className="w-5 h-5 text-white animate-pulse" />}
                      {aiAnalysisStage === 3 && <Sparkles className="w-5 h-5 text-white animate-pulse" />}
                    </div>
                  </div>
                  <div className="rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, delay: 0.2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, delay: 0.4, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                        />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {aiAnalysisStage === 0 && "Processing your message..."}
                        {aiAnalysisStage === 1 && "Analyzing patterns..."}
                        {aiAnalysisStage === 2 && "Consulting medical knowledge..."}
                        {aiAnalysisStage === 3 && "Generating recommendations..."}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Form */}
        <form onSubmit={handleSubmit} className="relative border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="pr-12 bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all duration-300"
                disabled={isThinking}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Wand2 className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={!input.trim() || isThinking}
              className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-500 dark:hover:to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
    </div>
        </form>
      </Card>
    </motion.div>
  );
}
