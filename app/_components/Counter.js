"use client";

import { useState } from "react";

export const Counter = ({ data }) => {
  const [counter, setCouter] = useState(0);

  return (
    <div>
      <p>There are {data.length} users.</p>
      <button onClick={() => setCouter(counter + 1)}>{counter}</button>
    </div>
  );
};
