import { Suspense } from "react";
import Sidebar from "@/components/dashboard-navbar";
import SettingsComponent from "@/components/pages/SettingsComponent";

export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-[#0c4a6e]/80" />}>
        <Sidebar />
        <SettingsComponent />
      </Suspense>
    </>
  );
}