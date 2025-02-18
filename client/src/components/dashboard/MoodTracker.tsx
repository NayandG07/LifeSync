import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { setTheme, type MoodType } from "@/lib/theme";

const moods: MoodType[] = ["happy", "sad", "anxious", "neutral"];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodType>("neutral");
  const [intensity, setIntensity] = useState([5]);
  const [note, setNote] = useState("");

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setTheme(mood);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
      <div className="flex gap-2 mb-4">
        {moods.map((mood) => (
          <Button
            key={mood}
            variant={selectedMood === mood ? "default" : "outline"}
            onClick={() => handleMoodSelect(mood)}
            className="capitalize"
          >
            {mood}
          </Button>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Intensity</label>
        <Slider
          value={intensity}
          onValueChange={setIntensity}
          max={10}
          step={1}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Notes</label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any notes about how you're feeling..."
        />
      </div>
      <Button className="w-full">Save Mood</Button>
    </Card>
  );
}
