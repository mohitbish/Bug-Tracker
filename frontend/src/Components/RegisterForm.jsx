import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from "react-router-dom";
import {registerRoute} from "../Routes/apiroute"


const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password2, setpassword2] = useState("");
  const[username,setusename]=useState('')

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleemailChange = (event) => {
    setemail(event.target.value);
  };
  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
  };
  const handlepassword2Change = (event) => {
    setpassword2(event.target.value);
  };
  const handleusernameChange = (event)=>{
    setusename(event.target.value)
  }

  const inputvalidation = () => {
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters", toastOptions);
      return false;
    }
    if (password2 !== password) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    }
    return true;
  };

  const registeruser = async(event) => {
    event.preventDefault()
    if(inputvalidation()){
      toast.success("Registering",toastOptions)
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        role:"user"
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.success("Registering",toastOptions)
        localStorage.clear()
        localStorage.setItem(
          "current-user",
          JSON.stringify(data.user)
        );
        navigate("/home");
      }
    }
    
  };

  return (
    <>

<form 
      onSubmit={(event) => registeruser(event)}
      className="w-2/5">
      <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => handleusernameChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleemailChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => handlepasswordChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="password2"
            onChange={(e) => handlepassword2Change(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Signup
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegisterForm;
