import { Josefin_Sans, Roboto } from "next/font/google";
import Header from "./_components/Header";
import { ReservationContextProvider } from "./_components/context/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

// const roboto = Roboto({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "500", "700"],
//   variable: "--font-roboto",
// });

// console.log(roboto);
// console.log(josefin);

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    default: "Welcome to The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description: "Luxury and Naturey cabin rentals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-accent-50 min-h-screen flex flex-col antialiased relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 h-screa">
          <main className="max-w-7xl mx-auto">
            {" "}
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
