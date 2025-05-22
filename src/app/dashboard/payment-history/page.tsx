import Sidebar from "@/components/dashboard-navbar";
import PaymentHistoryComponent from "@/components/pages/PaymentHistoryComponent";
import { getCurrentUserEmail, getPaymentHistory } from "@/db-access/fetchUserData";

export default async function Page() {
    const userEmail = await getCurrentUserEmail();
    if (!userEmail) {
        return Response.redirect("/login");
    }

    const paymentHistory = await getPaymentHistory(userEmail, null);

    return (
      <main className="flex">
        <Sidebar />
        <div className="ps-64 w-full">
          <PaymentHistoryComponent 
            paymentHistory={paymentHistory} 
          
          />
        </div>
      </main>
    );
  }
  