import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponenet from "../Components/Navbar";
import ProjectUsers from "../Components/ProjectUsers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateprojectinfo, getprojectinfo,deleteproject } from "../Routes/apiroute";
import { useNavigate } from "react-router-dom";
import ProjectTickets from "../Components/ProjectTickets";

const ProjectDetail = (projectdata) => {
  const navigate = useNavigate();
  const [project, setproject] = useState({});
  const [name, setname] = useState("");
  const [id, setid] = useState("");
  const [status, setstatus] = useState("");
  const [priority, setpriority] = useState("");
  const [date, setdate] = useState("");
  const [userlist, setuserlist] = useState(false);
  const [tickelist, settickelist] = useState(false);
  const [userlistdata, setuserlistdata] = useState([]);
  const [tickets, settickets] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    async function fetchoneproject() {
      const projid = await JSON.parse(localStorage.getItem("current-project"));

      const { data } = await axios.post(getprojectinfo, {
        id: projid._id,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        setproject(data.project[0]);
      }
    }

    fetchoneproject();
  }, []);

  useEffect(() => {
    if (project !== undefined && project !== {}) {
      setname(project.name);
      setstatus(project.status);
      setpriority(project.priority);
      setdate(project.onlydate);
      setid(project._id);
      setuserlistdata(project.userlist);
    }
  }, [project]);

  const editproject = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(updateprojectinfo, {
      id,
      name,
      status,
      priority,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("updated", toastOptions);
      setproject(data.project[0]);
    }
  };

  const handledeleteproject =async()=>{
    const { data } = await axios.post(deleteproject, {
      id,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("deleted", toastOptions);
      navigate('/projects')
    }
  }

  return (
    <div className="relative w-full h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />

      <div className="relative w-full flex flex-row justify-around pt-8">
        <button
          onClick={() => {
            navigate("/projects");
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
        <div className="w-2/5 mt-10">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl uppercase font-bold my-4 dark:text-white">
              {name}
            </h1>
            <h1 className="text-xs uppercase  my-4 dark:text-white">
              Added on - {date}
            </h1>
          </div>
          <form onSubmit={(e) => editproject(e)} className="w-full">
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
                value={name || ""}
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
                value={status || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="on-going">on-going</option>
                <option value="upcoming">upcoming</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="priority"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Priorty
              </label>
              <select
                id="status"
                onChange={(e) => setpriority(e.target.value)}
                value={priority || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="low">low</option>
                <option value="moderate">moderate</option>
                <option value="high">high</option>
              </select>
            </div>
            <div className="mb-6 ">
              <button
                type="button"
                onClick={() => {
                  setuserlist(true);
                  settickelist(false)
                }}
                className=" w-full flex-row justify-between bg-gray-50 border border-gray-300 text-gray-900 font-sm rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
              >
                Assinged Users
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-6 ">
              <button
                type="button"
                onClick={() => {
                  setuserlist(false);
                  settickelist(true)
                }}
                className=" w-full flex-row justify-between bg-gray-50 border border-gray-300 text-gray-900 font-sm rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500"
              >
                Tickets
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-row justify-between">
              <button
                type="submit"
                className="flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={()=> handledeleteproject()}
                className="flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
        <div className={userlist ? "w-1/2 ml-10 mt-10" : "hidden"}>
          <ProjectUsers />
        </div>
        <div className={tickelist ? "w-1/2 ml-10 mt-10" : "hidden"}>
          <ProjectTickets />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProjectDetail;
