import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponenet from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketDetail = () => {
  const navigate = useNavigate();
  const [status, setstatus] = useState("");

  return (
    <>
      <div className="relative w-full h-screen bg-blue-100 dark:bg-gray-700">
        <NavbarComponenet />

        <div className="relative w-full flex flex-row justify-around pt-8">
          <button
            onClick={() => {
              navigate("/tickets");
            }}
            className="absolute right-6 top-0 text-xs dark:text-white"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
          {/* ticket details */}
          <div className="w-2/5">

          </div>
          {/* comments history */}
          <div className="w-3/5">

          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetail;
