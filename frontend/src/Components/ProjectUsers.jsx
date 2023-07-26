import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getusers } from "../Routes/apiroute";

const ProjectUsers = (data) => {
  const [users, setusers] = useState([]);
  const [usercheck, setusercheck] = useState(false);
  const [name, setname] = useState("");
  const [allusers, setallusers] = useState([]);
  const [showallusers, setshowallusers] = useState(false);
  const [currentpage, setcureentpage] = useState(1);
  const usersperspage = 6;
  const lastindex = currentpage * usersperspage;
  const firstindex = lastindex - usersperspage;
  const records = allusers.slice(firstindex, lastindex);
  const npage = Math.ceil(allusers.length / usersperspage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    setusers(data.userlist);
    setname(data.name);
  });
  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));
    if (current_user.role === "admin") {
      setusercheck(!usercheck);
    }
    async function fetchallUsers() {
      let response = await axios.get(getusers);
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      }
      setallusers(response.data.users);
    }
    fetchallUsers();
  }, []);

  const nextpage = () => {
    if (currentpage !== npage) {
      setcureentpage(currentpage + 1);
    }
  };
  const previouspage = () => {
    if (currentpage !== 1) {
      setcureentpage(currentpage - 1);
    }
  };
  const changepage = (id) => {
    setcureentpage(id);
  };

  return (
    <div className="flex flex-col">
      {/* header */}
      <div className="flex flex-row justify-between">
        {showallusers ? (
          <h1 className=" dark:text-white text-black">Add Users to {name}</h1>
        ) : (
          <h1 className=" dark:text-white text-black">
            Users working on {name}
          </h1>
        )}
        {/* usercheck and user add button */}
        {usercheck ? (
          <div>
            {showallusers ? (
              <button
                type="button"
                onClick={() => setshowallusers(false)}
                className=" flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
              >
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white"
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
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setshowallusers(true)}
                className=" flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
              >
                user
                <svg
                  className="w-3 h-3 ml-1 my-1 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {/*all users table */}
      <div
        className={
          showallusers
            ? " w-full  relative overflow-x-auto shadow-md sm:rounded-lg"
            : "hidden"
        }
      >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Username</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Title</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((user, uid) => (
              <tr
                key={uid}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.username}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.title}
                </th>

                <td className="px-6 py-4">
                  <button
                    //onClick={() => edituserinfo(user)}
                    className="text-xs mr-4"
                  >
                    <svg
                      className="w-4 h-4 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 8h6m-3 3V5m-6-.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                      />
                    </svg>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentpage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {npage}
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                onClick={() => previouspage()}
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>

            <li>
              <a
                onClick={() => nextpage()}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProjectUsers;
