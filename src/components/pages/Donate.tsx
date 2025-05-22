import { Suspense } from "react";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import DonateClient from "@/app/donate/page";

export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-[#0c4a6e]/80" />}>
        <NavbarWrapper />
      </Suspense>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0c4a6e] via-[#0369a1] to-[#0c4a6e]">
        <DonateClient />
      </div>
    </>
  );
}
