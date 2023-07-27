import React, { useState } from "react";
import { addproject } from "../Routes/apiroute";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewProject = (props) => {
  const [name, setname] = useState("");
  const [status, setstatus] = useState("on-going");
  const [priority, setpriority] = useState("low");
  const date  = new Date();
  const onlydate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  const fulldate = date.toString()

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(addproject, {
      name,
      status,
      priority,
      onlydate,
      fulldate   
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      setstatus("on-going");
      setname("");
      setpriority("low");
      const sortedarry = data.projects.sort(function (a, b) {
        var c = new Date(a.fulldate);
        var d = new Date(b.fulldate);
        return d - c;
      });

      props.onChange({ value:sortedarry , check: false });
    }
  };

  return (
    <>
      <h1 className="text-2xl uppercase font-bold my-4 dark:text-white">
        New-Project
      </h1>

      <form onSubmit={(e) => handlesubmit(e)} className="w-full">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project name
          </label>
          <input
            type="text"
            id="proj-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="status"
            onChange={(e) => setstatus(e.target.value)}
            value={status}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="on-going">on-going</option>
            <option value="upcoming">upcoming</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="priority"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Role
          </label>
          <select
            id="status"
            onChange={(e) => setpriority(e.target.value)}
            value={priority}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="low">low</option>
            <option value="moderate">moderate</option>
            <option value="high">high</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
        >
          Create
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default NewProject;
