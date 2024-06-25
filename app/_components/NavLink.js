"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, className, children }) => {
  const path = usePathname();

  const active = path === href;

  return (
    <Link href={href} className={`${className} ${active && "text-accent-400"}`}>
      {children}
    </Link>
  );
};

export default NavLink;
