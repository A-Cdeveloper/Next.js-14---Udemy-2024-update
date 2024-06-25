"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest as updateGuestProfile,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const LoginGoogle = async () => {
  await signIn("google", { redirectTo: "/account" });
};

// export const LoginFacebook = async () => {
//   await signIn("facebook", { redirectTo: "/account" });
// };

export const LogOutGoogle = async () => {
  await signOut({ redirectTo: "/" });
};

// export const LogOutFacebook = async () => {
//   await signOut("facebook", { redirectTo: "/login" });
// };

export const updateGuest = async (formData) => {
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  const data = Object.fromEntries(formData.entries());
  const { nationality, nationalID } = data;

  const [country, flag] = nationality.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  await updateGuestProfile(session.user.guestId, {
    nationalID: nationalID,
    nationality: country,
    countryFlag: flag,
  });

  // console.log(updatedGuest);
  // console.log(country, flag, nationalID);
  revalidatePath("/account/profile");
};

export const deleteReservationAction = async (bookingId) => {
  // console.log(bookingId);
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  // throw new Error(); // TESTING OPTIMISTIC UPDATE

  const bookings = await getBookings(session.user.guestId);
  if (!bookings.some((el) => el.id === +bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const updateReservationAction = async (bookingId, formData) => {
  // console.log(bookingId);
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  const bookings = await getBookings(session.user.guestId);

  if (!bookings.some((el) => el.id === +bookingId)) {
    throw new Error("You are not allowed to edit this booking");
  }

  const data = Object.fromEntries(formData.entries());

  await updateBooking(bookingId, data);
  revalidatePath(`/account/reservations/${bookingId}`);
  revalidatePath("/account/reservations/edit");
  redirect("/account/reservations");
  // console.log(bookingId);
  // console.log(data);
};

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

export const createBookingAction = async (newBooking, formData) => {
  const session = await auth();
  if (!session) {
    throw new Error("You are not authenticated");
  }

  const newReservation = {
    guestId: session.user.guestId,
    ...newBooking,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  await createBooking(newReservation);
  revalidatePath(`/cabins/${newBooking.cabinId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
};
