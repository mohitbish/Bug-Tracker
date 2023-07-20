import React,{useState} from "react";

const LoginForm = () => {
  return (
    <>
      <form className="w-2/5 bg-gray-300  items-center px-10 pt-2 pb-10 rounded-t-xl">
        <h1 className="text-4xl font-bold text-blue-700 uppercase text-center mt-2 mb-12">
          login
        </h1>
        <div className="mb-6 ">
          <label
            for="email"
            className="block mb-2 text-sm uppercase font-bold text-gray-900 dark:text-white"
          >
            email
          </label>
          <input
            type="email"
            id="email"
            className=" w-3/5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@bgtrack.com"
            required
          />
        </div>
        <div class="mb-6 ">
          <label
            for="password"
            className="block mb-2  text-sm uppercase font-bold text-gray-900 dark:text-white"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            className="w-3/5 shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
