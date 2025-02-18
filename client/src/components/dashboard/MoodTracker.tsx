import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { setTheme, type MoodType } from "@/lib/theme";
import { Sun, Cloud, CloudRain, Smile, Zap } from "lucide-react";
import { motion } from "framer-motion";

const moodConfig = {
  happy: { icon: Sun, label: "Happy", color: "text-yellow-500" },
  sad: { icon: CloudRain, label: "Sad", color: "text-blue-500" },
  anxious: { icon: Cloud, label: "Anxious", color: "text-green-500" },
  neutral: { icon: Smile, label: "Neutral", color: "text-purple-500" },
  energetic: { icon: Zap, label: "Energetic", color: "text-red-500" }
} as const;

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodType>("neutral");
  const [intensity, setIntensity] = useState([5]);
  const [note, setNote] = useState("");

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setTheme(mood);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-6">How are you feeling?</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {(Object.entries(moodConfig) as [MoodType, typeof moodConfig.happy][]).map(([mood, config]) => {
            const Icon = config.icon;
            return (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                onClick={() => handleMoodSelect(mood)}
                className={`flex-col gap-2 h-auto py-4 ${
                  selectedMood === mood ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                <Icon className={`h-6 w-6 ${config.color}`} />
                <span className="capitalize">{config.label}</span>
              </Button>
            );
          })}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Intensity - {intensity[0]}/10
            </label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              What's on your mind?
            </label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any notes about how you're feeling..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <Button className="w-full" size="lg">
            Save Mood
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}