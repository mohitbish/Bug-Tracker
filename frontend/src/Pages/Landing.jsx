import React, { useState } from "react";
import LoginForm from "../Components/LoginForm";
import backgroundImage from "../Assets/bg.jpg";
import RegisterForm from "../Components/RegisterForm";

const Landing = () => {
  const [formcheck, setformcheck] = useState(true);

  const formchange = () => {
    setformcheck(!formcheck);
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {formcheck ? <LoginForm /> : <RegisterForm />}

        <div className="w-2/5 flex flex-col justify-center items-center  bg-gray-300 rounded-b-xl">
          {formcheck ? (
            <div>
              <span className="mx-7">New to app? </span>
              <button
                type="button"
                onClick={() => formchange()}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Register
              </button>
            </div>
          ) : (
            <div>
              <span className="mx-7">already a user? </span>
              <button
                type="button"
                onClick={() => formchange()}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Login
              </button>
            </div>
          )}
          <div>
            <span className="mx-4">Demo admin login?</span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Admin login
            </button>
          </div>
          <div>
            <span className="mx-4">Demo user login?</span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              User login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
