import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponenet from "../Components/Navbar";
import { getusers } from "../Routes/apiroute";
import { updateuser, deleteuser } from "../Routes/apiroute";

const AdminRole = () => {
  useEffect(() => {
    async function fetchUsers() {
      let response = await axios.get(getusers);
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      }
      setusers(response.data.users);
    }
    fetchUsers();
  }, []);

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [users, setusers] = useState([]);
  const [search, setsearch] = useState("");
  const [currentpage, setcureentpage] = useState(1);
  const usersperspage = 7;
  const lastindex = currentpage * usersperspage;
  const firstindex = lastindex - usersperspage;
  const records = users.slice(firstindex, lastindex);
  const npage = Math.ceil(users.length / usersperspage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [editusercheck, seteditusercheck] = useState(false);
  const [id, setid] = useState("");
  const [username, setusername] = useState("");
  const [email, seteamil] = useState("");
  const [role, setrole] = useState("");

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

  const edituserinfo = async (user) => {
    setid(user._id);
    setusername(user.username);
    seteamil(user.email);
    setrole(user.role);
    seteditusercheck(!editusercheck);
  };

  const deleteuserinfo = async (user) => {
    const { data } = await axios.post(deleteuser, {
      user,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("deleted", toastOptions);
      setusers(data.users);
    }
  };

  const updateuserinfo = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(updateuser, {
      email,
      username,
      id,
      role,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("updated", toastOptions);
      setusers(data.users);
      seteditusercheck(!editusercheck);
    }
  };

  return (
    <div className=" h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />

      <div className=" flex flex-col my-10 mx-4 items-center">
        {/* edit form */}
        <div
          className={
            editusercheck
              ? "relative flex flex-col items-center w-3/5"
              : "hidden"
          }
        >
          <button
            onClick={() => seteditusercheck(!editusercheck)}
            className="absolute right-0 top-0 text-xs dark:text-white"
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
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
          <h1 className="text-2xl uppercase font-bold my-4 dark:text-white">
            update user
          </h1>

          <form onSubmit={(e) => updateuserinfo(e)} className="w-full">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={email}
                onChange={(e) => seteamil(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="roles"
                onChange={(e) => setrole(e.target.value)}
                placeholder={role}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              update
            </button>
          </form>
        </div>
        {/* Users table  */}
        <div
          className={
            editusercheck
              ? "hidden"
              : " w-full  relative overflow-x-auto shadow-md sm:rounded-lg"
          }
        >
          <div className="pb-4 bg-blue-100 dark:bg-gray-900">
            {/* table header */}
            <div className="relative flex flex-rows ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                onChange={(e) => setsearch(e.target.value)}
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
              <h1 className="ml-80 mt-2 font-bold text-2xl text-gray-900  dark:text-white ">
                User-List
              </h1>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Username</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Email</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Role</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {records
                .filter((user) => {
                  return search.toLowerCase() === ""
                    ? user
                    : user.username.toLowerCase().includes(search);
                })
                .map((user, uid) => (
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
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => edituserinfo(user)}
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
                            d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"
                          />
                        </svg>{" "}
                        edit
                      </button>
                      <button
                        onClick={() => deleteuserinfo(user)}
                        className="font-xs"
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
                            d="M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"
                          />
                        </svg>{" "}
                        del
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
              {numbers.map((n, i) => (
                <li key={i}>
                  <a
                    onClick={() => changepage(n)}
                    className={
                      numbers.indexOf(n) + 1 == currentpage
                        ? "flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "flex items-center justify-center px-3 h-8 leading-tight text-gray-400 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                  >
                    {n}
                  </a>
                </li>
              ))}
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

      <ToastContainer />
    </div>
  );
};

export default AdminRole;
