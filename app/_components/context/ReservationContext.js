"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };

export const ReservationContextProvider = ({ children }) => {
  const [range, setRange] = useState(initialState);

  const resetRange = () => {
    setRange(initialState);
  };

  const value = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationContextProvider"
    );
  }
  return context;
};

export default ReservationContext;
