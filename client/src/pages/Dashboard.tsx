import HealthMetrics from "@/components/dashboard/HealthMetrics";
import MoodTracker from "@/components/dashboard/MoodTracker";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome Back</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <MoodTracker />
        <HealthMetrics />
      </div>
    </div>
  );
}
