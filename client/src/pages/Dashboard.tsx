import ExtendedHealthMetrics from "@/components/dashboard/ExtendedHealthMetrics";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Monitor your health metrics and daily activities
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <ExtendedHealthMetrics />
      </div>
    </div>
  );
}