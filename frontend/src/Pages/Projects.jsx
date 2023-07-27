import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponenet from "../Components/Navbar";
import NewProject from "../Components/NewProject";
import { getprojects } from "../Routes/apiroute";
import { useNavigate } from "react-router-dom";

const Projects = () => {

  const navigate = useNavigate();
  const [usercheck, setusercheck] = useState(false);
  const [addnewproject, setaddnewproject] = useState(false);
  const [projects, setProjects] = useState([{}]);
  const [projectdata, setprojectdata] = useState({});
  const [search, setsearch] = useState("");
  const [currentpage, setcureentpage] = useState(1);
  const projectsperspage = 8;
  const lastindex = currentpage * projectsperspage;
  const firstindex = lastindex - projectsperspage;
  const records = projects.slice(firstindex, lastindex);
  const npage = Math.ceil(projects.length / projectsperspage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));
    if (current_user.role === "admin") {
      setusercheck(!usercheck);
    }

    async function fetchdata() {
      let response = await axios.get(getprojects);
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      }
      const sortedarry = response.data.projects.sort(function (a, b) {
        var c = new Date(a.fulldate);
        var d = new Date(b.fulldate);
        return d - c;
      });
      setProjects(sortedarry);
    }
    fetchdata();
  }, []);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handlechange = (data) => {
    setProjects(data.value);
    setaddnewproject(data.check);
  };

  const setprojectdetail = async (proj) => {
    localStorage.removeItem("current-project");
    localStorage.setItem("current-project", JSON.stringify(proj));
    navigate("/projectdetail");
  };

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
    <div className="w-full min-h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />

      <div className="w-full  flex flex-row justify-around">
        {/* projects table */}
        <div className={addnewproject ? "w-1/2 mt-10" : "w-full mx-10 mt-10"}>
          <h1 className="text-center my-2 font-bold  text-gray-900  dark:text-white ">
            Project-List
          </h1>
          {/* table header */}
          <div className="pb-4 bg-blue-100 dark:bg-gray-900">
            <div className="relative flex flex-rows justify-between pt-1 px-1">
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
                className="block p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for products"
              />
              {usercheck ? (
                <button
                  type="button"
                  onClick={() => setaddnewproject(true)}
                  className=" flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
                >
                  Project
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
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* {table list} */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {records
                  .filter((proj) => {
                    return search.toLowerCase() === ""
                      ? proj
                      : proj.name.toLowerCase().includes(search);
                  })
                  .map((proj, pid) => (
                    <tr
                      key={pid}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {proj.name}
                      </th>
                      <td className="px-6 py-4">{proj.status}</td>
                      <td className="px-6 py-4">{proj.priority}</td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => setprojectdetail(proj)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          details
                        </a>
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
        {/* newproject form */}
        <div
          className={
            addnewproject
              ? "relative flex flex-col items-center w-2/5  my-10"
              : "hidden"
          }
        >
          <button
            onClick={() => setaddnewproject(false)}
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

          <NewProject onChange={(data) => handlechange(data)} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Projects;
