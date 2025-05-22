"use client";

import { useRouter } from "next/navigation";
import { CheckoutComponent } from "@/components/pages/CheckoutComponent";

export default function CheckoutPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/adopt");
    };

    return (
        <>
            <CheckoutComponent onBack={handleBack} />
        </>
    );
}