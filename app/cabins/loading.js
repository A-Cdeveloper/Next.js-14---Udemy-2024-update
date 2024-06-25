import React from "react";
import "@/app/_styles/globals.css";
import Spinner from "@/app//_components/Spinner";
const loading = () => {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p>Loading data...</p>
    </div>
  );
};

export default loading;
