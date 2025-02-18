import HealthMetrics from "@/components/dashboard/HealthMetrics";
import MoodTracker from "@/components/dashboard/MoodTracker";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">
          Track your mood and monitor your health metrics
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MoodTracker />
        <HealthMetrics />
      </div>
    </div>
  );
}