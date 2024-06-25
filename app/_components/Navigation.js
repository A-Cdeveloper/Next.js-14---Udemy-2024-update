import NavLink from "@/app/_components/NavLink";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();

  // console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <NavLink
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </NavLink>
        </li>
        <li>
          <NavLink
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </NavLink>
        </li>

        <li>
          {session?.user ? (
            <NavLink
              href="/account"
              className="hover:text-accent-400 transition-colors flex justify-between items-center gap-2"
            >
              <Image
                src={session.user.image}
                width={30}
                height={30}
                alt={session.user.name}
                className="rounded-full"
              />
              <span>Guest area</span>
            </NavLink>
          ) : (
            <NavLink
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
