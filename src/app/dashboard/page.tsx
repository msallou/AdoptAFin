import { DashboardComponent } from "@/components/pages/DashboardComponent";
import Sidebar from "@/components/dashboard-navbar";
import { getAmountDonated, getCurrentUserEmail, getNumberFishAdopted, getPaymentHistory } from "@/db-access/fetchUserData";

export default async function Dashboard() {
    const userEmail = await getCurrentUserEmail();
    if (!userEmail) {
        return Response.redirect("/login");
    }

    const paymentHistory = await getPaymentHistory(userEmail, 5);
    const fishAdopted = await getNumberFishAdopted(userEmail);
    const amountDonated = await getAmountDonated(userEmail);

    return (
        <>
            {/* <NavbarWrapper /> */}
            <div className="flex">
                <Sidebar />
                <div className="ps-64 w-full">
                    <DashboardComponent
                        paymentHistory={paymentHistory}
                        fishAdopted={fishAdopted}
                        amountDonated={amountDonated}
                    />
                </div>
            </div>
        </>
    )
}