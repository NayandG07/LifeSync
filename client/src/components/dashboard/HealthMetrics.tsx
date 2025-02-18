import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { date: "Mon", steps: 6000, sleep: 7, mood: 8 },
  { date: "Tue", steps: 8000, sleep: 6, mood: 7 },
  { date: "Wed", steps: 7000, sleep: 8, mood: 8 },
  { date: "Thu", steps: 9000, sleep: 7, mood: 9 },
  { date: "Fri", steps: 8500, sleep: 8, mood: 8 },
];

export default function HealthMetrics() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Health Overview</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="steps" stroke="#8884d8" />
            <Line type="monotone" dataKey="sleep" stroke="#82ca9d" />
            <Line type="monotone" dataKey="mood" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
