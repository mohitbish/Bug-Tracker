import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../Components/LoginForm";
import RegisterForm from "../Components/RegisterForm";
import { loginRoute } from "../Routes/apiroute";

const Landing = () => {
  const navigate = useNavigate();
  const [formcheck, setformcheck] = useState(true);

  const formchange = () => {
    setformcheck(!formcheck);
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const demouserlogin = async () => {
    const { data } = await axios.post(loginRoute, {
      email: "du@g.com",
      password: "12345678",
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("loading", toastOptions);
      localStorage.setItem("current-user", JSON.stringify(data.user));
      navigate("/home");
    }
  };

  const demoadminlogin = async () => {
    const { data } = await axios.post(loginRoute, {
      email: "m@g.com",
      password: "12345678",
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("loading", toastOptions);
      localStorage.setItem("current-user", JSON.stringify(data.user));
      navigate("/home");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white border-gray-200 dark:bg-gray-900 pb-6">
      <div className="realtive flex flex-row  justify-between bg-white border-gray-200 dark:bg-gray-900 mb-10">     
        {/* logo */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
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
            <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
              Bug-Tracker
            </span>
          </a>
        </div>
      </div>
      {/* form and buttons */}
      <div className="w-3/5  bg-blue-100 dark:bg-gray-600 flex flex-col items-center ">
        {formcheck?(<h2 className="text-2xl text:black dark:text-white uppercase font-bold mb-10">
          Login
        </h2>):(<h2 className="text-2xl text:black dark:text-white uppercase font-bold mb-10">
          Register
        </h2>)}
        {formcheck ? <LoginForm /> : <RegisterForm />}
        {/* buttons */}
        <div className="mt-10  flex flex-row px-2 py-4">
          {formcheck ? (
            <div className="flex flex-col my-2 mx-2">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2">
                New to app?
              </span>
              <button
                type="button"
                onClick={() => formchange()}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup
              </button>
            </div>
          ) : (
            <div  className="flex flex-col my-2 mx-2">
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2">
                Already a user?
              </span>
              <button
                type="button"
                onClick={() => formchange()}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                login
              </button>
            </div>
          )}
          <div  className="flex flex-col my-2 mx-2">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2 ">
              Demo user login?
            </span>
            <button
              type="button"
              onClick={() => demouserlogin()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              User
            </button>
          </div>
          <div  className="flex flex-col my-2 mx-2">
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-2 ">
              Demo admin login?
            </span>
            <button
              type="button"
              onClick={() => demoadminlogin()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Landing;
