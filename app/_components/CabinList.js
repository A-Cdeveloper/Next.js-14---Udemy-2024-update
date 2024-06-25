import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

//const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const CabinList = async ({ filter }) => {
  //noStore(); // additional options to fetch, like cache: 'no-store' or next: { revalidate: 0 }

  const cabins = await getCabins();

  let filteredCabins;

  if (filter === "all") {
    filteredCabins = cabins;
  }
  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 8
    );

  if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity > 8);

  //console.log(filteredCabins);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.length > 0 ? (
        filteredCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))
      ) : (
        <div>No cabins found</div>
      )}
    </div>
  );
};
