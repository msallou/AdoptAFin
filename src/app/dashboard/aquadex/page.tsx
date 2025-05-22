// import { NavbarWrapper } from "@/components/navbar-wrapper";
import { AquaDexComponent } from "@/components/pages/AquaDexComponent";
// import { fetchFeaturedFish, fetchFish } from "@/db-access/fish";
// import LoadingScreen from "@/components/loading";
import Sidebar from "@/components/dashboard-navbar";
import { importFish } from "../actions";

export default async function AquaDexPage() {
    const {data: fish} = await importFish();
    // console.log(fish);
    

    return (
        <>
            <Sidebar />
            <div className="ps-64 w-full">
                
                <AquaDexComponent 
                    fishList={fish}
                />
            </div>
        </>
    )
}