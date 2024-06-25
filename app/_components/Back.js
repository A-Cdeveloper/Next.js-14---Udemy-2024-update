"use client";

import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  // console.log(router);
  return (
    <button
      onClick={() => router.back()}
      class="bg-violet-500 text-white font-bold py-2 px-4 rounded hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300"
    >
      Back
    </button>
  );
};

export default Back;
