import { NavbarWrapper } from "@/components/navbar-wrapper";
import { AdoptComponent } from "@/components/pages/AdoptComponent";
import { checkIfFishAdopted, getCurrentUserEmail } from "@/db-access/fetchUserData";
import { fetchFeaturedFish, fetchFish } from "@/db-access/fish";
// import LoadingScreen from "@/components/loading";

export default async function AdoptPage() {
    const fish = await fetchFish();
    const featuredFish = await fetchFeaturedFish();
    // const usersFish = await importFish();
    const email = await getCurrentUserEmail().then((email) => {
        if (email === null) {
            // Redirect to login page
            // console.log("email is null");
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/login",
                },
            });
        }
        return email;
    });
    if (!email) {
        return null; // Handle the case where email is null
    }
            
    // console.log(fish)

    const fishWithAdopted = await Promise.all(
        fish!.map(async (fish) => {
            const adopted = await checkIfFishAdopted(email as string, fish.fish);
          return {
            ...fish,
            adopted: adopted,
          };
        })
      );
    const featuredFishWithAdopted = await Promise.all(
        featuredFish!.map(async (fish) => {
            const adopted = await checkIfFishAdopted(email as string, fish!.fish);
          return {
            ...fish,
            adopted: adopted,
          }
        }
      )
    )

    return (
        <>
            <NavbarWrapper />
            
            <AdoptComponent 
                fish={fishWithAdopted} 
                featuredFish={featuredFishWithAdopted}
            />
        </>
    )
}