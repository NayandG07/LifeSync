import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
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
    <Card className="p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">Health Overview</h2>
        <p className="text-sm text-muted-foreground">
          Your weekly health metrics at a glance
        </p>
      </div>

      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}