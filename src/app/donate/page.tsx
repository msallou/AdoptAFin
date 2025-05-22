import { Suspense } from "react";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import DonateClient from "@/components/pages/DonateClient";

export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-[#0c4a6e]/80" />}>
        <NavbarWrapper />
      </Suspense>
      <DonateClient />
    </>
  );
}
