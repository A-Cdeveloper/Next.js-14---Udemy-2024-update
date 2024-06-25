"use client";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

import { deleteReservationAction } from "../_lib/actions";

const ReservationList = ({ bookings }) => {
  //IMPORTANT
  //const [optimisticState, optimisticFN] = useOptimistic(inistialState, updateFn);
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  const handlerDelete = async (bookingId) => {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handlerDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
