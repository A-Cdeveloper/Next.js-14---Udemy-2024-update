"use client";

import { differenceInDays, format } from "date-fns";
import { useReservationContext } from "./context/ReservationContext";
import { createBookingAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservationContext();

  // CHANGE
  const {
    maxCapacity,
    regularPrice,
    discount,
    id,
    extrasPrice,
    hasBreakfast,
    isPaid,
  } = cabin;
  // console.log(cabin);

  const startDate = range.from && new Date(range.from).toISOString();
  const endDate = range.to && new Date(range.to).toISOString();
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = (regularPrice - discount) * numNights;

  const newBooking = {
    startDate,
    endDate,
    numNights,
    cabinId: id,
    cabinPrice,
    extrasPrice,
    isPaid: false,
    hasBreakfast: false,
    totalPrice: (regularPrice - discount) * numNights,
    status: "unconfirmed",
  };

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        // action={createBookingAction.bind(null, newBooking)}
        action={(formData) => {
          createBookingAction.bind(null, newBooking)(formData);
          resetRange();
        }}
      >
        <div>
          <p>
            {range.from && range.to
              ? `Your stay from ${format(startDate, "dd/MM/yyyy")} to ${format(
                  endDate,
                  "dd/MM/yyyy"
                )}`
              : ""}
          </p>
        </div>
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {startDate && endDate ? (
            <SubmitButton recource={"reservation"} />
          ) : (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
