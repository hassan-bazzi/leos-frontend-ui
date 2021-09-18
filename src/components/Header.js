import React from "react";
import Logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <div>
      <div className="text-4xl font-bold">
        Leo's Coney Island - Commerce Township
      </div>
      <div className="text-lg font-semibold text-gray-400">
        Open Hours: 8:00am to 9:00pm
      </div>
      <div className="text-lg font-semibold text-gray-400">
        4895 Carroll Lake Rd, Commerce Charter Twp, MI 48382
      </div>
    </div>
  );
}
