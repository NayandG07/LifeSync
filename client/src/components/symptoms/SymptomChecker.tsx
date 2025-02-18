import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { analyzeSymptoms } from "@/lib/huggingface";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const analyze = async () => {
    setLoading(true);
    try {
      const results = await analyzeSymptoms(symptoms);
      setAnalysis(results);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
    }
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Symptom Checker</h2>
      <div className="flex gap-2 mb-4">
        <Input
          value={currentSymptom}
          onChange={(e) => setCurrentSymptom(e.target.value)}
          placeholder="Enter a symptom..."
          onKeyPress={(e) => e.key === "Enter" && addSymptom()}
        />
        <Button onClick={addSymptom}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {symptoms.map((symptom, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => removeSymptom(index)}
          >
            {symptom} ✕
          </Badge>
        ))}
      </div>
      {symptoms.length > 0 && (
        <Button
          className="w-full mb-4"
          onClick={analyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </Button>
      )}
      {analysis.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Possible Conditions:</h3>
          <ul className="list-disc pl-4">
            {analysis.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
