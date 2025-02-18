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
    <Card className="p-4 md:p-6 overflow-hidden">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Health Overview</h2>
        <p className="text-sm text-muted-foreground">
          Your weekly health metrics at a glance
        </p>
      </div>

      <div className="h-[300px] w-full min-w-[300px] overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--foreground))" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              wrapperStyle={{
                paddingTop: "8px"
              }}
            />
            <Line
              type="monotone"
              dataKey="steps"
              name="Steps"
              stroke="hsl(250 84% 54%)"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              name="Sleep (hrs)"
              stroke="hsl(43 96% 56%)"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              name="Mood"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}