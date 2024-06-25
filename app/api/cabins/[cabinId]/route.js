import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return NextResponse.json({ cabin, bookedDates });
  } catch (error) {
    return NextResponse.json({ message: "Cabin not found" }, { status: 404 });
  }
};
