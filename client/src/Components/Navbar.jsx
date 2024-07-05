import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Navbar({ loggedIn }) {
  const navigate = useNavigate();
  return (
    <nav className="sticky">
      <div className=" flex flex-row justify-between align-middle m-auto p-3 bg-transparent">
        <div className="self-center">
          <span className="text-[#0C1844] text-2xl font-bold mx-4">
            Events Management
          </span>
        </div>
        <div className="flex flex-row justify-center align-middle">
          <button
            className="border-2 border-[#0C1844] text-white bg-[#0C1844] mx-2 font-semibold flex items-center justify-center rounded-md px-4 py-2"
            onClick={() => {
              if (loggedIn) {
                navigate("/add-event");
              } else {
                navigate("/login");
              }
            }}
          >
            <FaPlus className="mr-1" />
            Add Event
          </button>
          {!loggedIn ? (
            <a
              className="border-2 border-gray-700 mx-2 font-semibold flex items-center justify-center rounded-md px-4 py-2"
              href="/login"
            >
              Sign in
            </a>
          ) : (
            <a
              className=" font-semibold flex items-center justify-center rounded-md px-4 py-2"
              href="/login"
            >
              <RxAvatar size={40} />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
