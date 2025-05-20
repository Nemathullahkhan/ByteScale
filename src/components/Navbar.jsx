import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center space-x-12 px-10 py-2 max-w-7xl">
      <Link
        to="/"
        className="text-2xl  font-semibold tracking-tight hover:text-blue-700"
      >
        {" "}
        Home{" "}
      </Link>
      <Link
        to="/content"
        className="text-2xl  font-semibold tracking-tight hover:text-blue-700"
      >
        {" "}
        Files{" "}
      </Link>
    </nav>
  );
};

export default Navbar;
