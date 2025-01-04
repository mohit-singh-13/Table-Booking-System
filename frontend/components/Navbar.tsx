"use client";

import Link from "next/link";
import Button from "./Button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="w-full h-20 shadow-xl flex justify-end">
      {path === "/" && (
        <Link href={"/bookings"}>
          <Button className="px-4 py-2 rounded-md bg-black hover:bg-[#474646] transition-all duration-200 text-white my-4 mr-4">
            All Bookings
          </Button>
        </Link>
      )}
      {path === "/bookings" && (
        <Link href={"/"}>
          <Button className="px-4 py-2 rounded-md bg-black hover:bg-[#474646] transition-all duration-200 text-white my-4 mr-4">
            Home
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
