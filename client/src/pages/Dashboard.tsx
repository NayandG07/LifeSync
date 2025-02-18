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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="col-span-1 space-y-6">
          <MoodTracker />
        </div>
        <div className="col-span-1 space-y-6">
          <HealthMetrics />
        </div>
      </div>
    </div>
  );
}