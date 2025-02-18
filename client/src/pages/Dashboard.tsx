import HealthMetrics from "@/components/dashboard/HealthMetrics";
import MoodTracker from "@/components/dashboard/MoodTracker";

export default function Dashboard() {
  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground">
          Track your mood and monitor your health metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full">
        <div className="w-full overflow-hidden">
          <MoodTracker />
        </div>
        <div className="w-full overflow-hidden">
          <HealthMetrics />
        </div>
      </div>
    </div>
  );
}