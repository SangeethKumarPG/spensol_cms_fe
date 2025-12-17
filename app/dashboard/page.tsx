import { Suspense } from "react";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="p-4">Loading dashboard...</p>}>
      <DashboardClient />
    </Suspense>
  );
}
