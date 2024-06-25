"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

import React from "react";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const activeFilter = params.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <Button
        activeFilter={activeFilter === "all"}
        filter="all"
        handlerFilter={handleFilter}
      >
        All Cabins
      </Button>

      <Button
        activeFilter={activeFilter === "small"}
        filter="small"
        handlerFilter={handleFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        activeFilter={activeFilter === "medium"}
        filter="medium"
        handlerFilter={handleFilter}
      >
        3&mdash;8 guests
      </Button>
      <Button
        activeFilter={activeFilter === "large"}
        filter="large"
        handlerFilter={handleFilter}
      >
        8&mdash;20 guests
      </Button>
    </div>
  );
};

const Button = ({ children, activeFilter, handlerFilter, filter }) => {
  let btnCLasses = "px-4 py-3 hover:bg-primary-700";
  const activeBtnClasses = `${btnCLasses} bg-primary-700`;

  return (
    <button
      className={activeFilter ? activeBtnClasses : btnCLasses}
      onClick={() => handlerFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
