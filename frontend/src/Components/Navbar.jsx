import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeComponent from "./DarkModeComponent";

const NavbarComponenet = () => {
  const navigate = useNavigate();
  const [usercheck, setusercheck] = useState(false);

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));
    if (current_user.role === "admin") {
      setusercheck(!usercheck);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full relative flex flex-row">
        <DarkModeComponent />
        <nav className="w-full bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-row justify-between items-center  max-w-screen-xl p-4">
            <a className="flex items-center mr-12">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white mx-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 20"
              >
                <path d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
              </svg>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Bug-Tracker
              </span>
            </a>
            <div className="flex items-center px-10">
              <button
                
                className=" text-blue-600 dark:text-blue-500 hover:underline mx-4"
              >
                Profile
              </button>

              <button
                onClick={() => logout()}
                className=" text-blue-600 dark:text-blue-500 hover:underline"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link
                  to="/home"
                  className="text-gray-900 dark:text-white hover:underline text-xl"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline text-xl"
                >
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-900 dark:text-white hover:underline text-xl"
                >
                  Team
                </a>
              </li>
              {usercheck ? (
                <li>
                  <Link
                    to="/adminrole"
                    className="text-gray-900 dark:text-white hover:underline text-xl"
                  >
                    Manage-Users
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponenet;
