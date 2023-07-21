import React, { useState, useEffect } from "react";
import logo from "../Assets/logo.png";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";

const Landing = () => {
  const [formcheck, setformcheck] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const changetheme = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const formchange = () => {
    setformcheck(!formcheck);
  };

  return (
    <>
      <div className="realtive flex flex-row justify-between bg-blue-100 border-gray-200 dark:bg-gray-900">
        <div className="absolute top-3 right-2 ">
          <button onClick={() => changetheme()}>
            {darkMode ? (
              <svg
                className="w-[30px] h-[30px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.3"
                  d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                />
              </svg>
            ) : (
              <svg
                className="w-[30px] h-[30px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.3"
                  d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white mx-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 19 20"
            >
              <path d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
            </svg>
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-purple-700">
              Bug-Tracker
            </span>
          </a>
        </div>
      </div>

      <div className="w-full h-screen bg-blue-100 dark:bg-gray-900 flex flex-col items-center pt-20">
        <h2 className="text-2xl text:black dark:text-white uppercase font-bold mb-10">
          Login
        </h2>
        {formcheck?<LoginForm />:<RegisterForm/>}
        <div className="mt-10 w-2/6 flex flex-col px-2 py-4">
          {formcheck
          ?<div className="flex flex-row my-2 justify-between">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2">
              New to app?
            </span>
            <button
              type="button"
              onClick={()=>formchange()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Signup
            </button>
          </div>
          :<div className="flex flex-row my-2 justify-between">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2">
              Already a user?
            </span>
            <button
              type="button"
              onClick={()=>formchange()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              login
            </button>
          </div>
          }
          <div className="flex flex-row my-2 justify-between">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2 ">
              Demo user login?
            </span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              User
            </button>
          </div>
          <div className="flex flex-row my-2 justify-between">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2 ">
              Demo admin login?
            </span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
