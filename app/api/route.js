import { NextResponse } from "next/server";

export const GET = async (request) => {
  //   console.log(request);
  return NextResponse.json({ message: "TEST" });
};

// export const POST = async () => {
//   return NextResponse();
// };
