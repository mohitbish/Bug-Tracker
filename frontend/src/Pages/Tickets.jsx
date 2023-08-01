import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponenet from "../Components/Navbar";
import Newticket from "../Components/Newticket";
import { gettickets, getprojects } from "../Routes/apiroute";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tickets = () => {
  const [newticketcheck, setnewticketcheck] = useState(false);
  const [tickets, settickets] = useState([]);
  const [currentpage, setcureentpage] = useState(1);
  const tickersperpage = 8;
  const lastindex = currentpage * tickersperpage;
  const firstindex = lastindex - tickersperpage;
  const records = tickets.slice(firstindex, lastindex);
  const npage = Math.ceil(tickets.length / tickersperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));
    async function fetchalltickets() {
      const { data } = await axios.get(gettickets);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        settickets(data.tickets);
        //sort and filter by user
      }
    }
    async function fetchprojecttickets() {
      let response = await axios.get(getprojects);
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      }
      const a1 = [];
      const a2 = [];
      response.data.projects.forEach((element) => {
        const new_array = element.users;
        new_array.map((e) => {
          if (e._id == current_user._id) {
            a1.push(element);
          }
        });
      });
      for (let item of a1) {
        if (!a2.includes(item)) a2.push(item);
      }
      const ticketlist = [];
      a2.map((p) => {
        p.tickets.map((t) => {
          ticketlist.push(t);
        });
      });
      settickets(ticketlist);
    }
    if (current_user.role == "admin") {
      fetchalltickets();
    } else {
      fetchprojecttickets();
    }
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

  const handlechange = async (data) => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));
    if (current_user.role == "admin") {
      settickets(data.value);
    } else {
      let response = await axios.get(getprojects);
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      }
      const a1 = [];
      const a2 = [];
      response.data.projects.forEach((element) => {
        const new_array = element.users;
        new_array.map((e) => {
          if (e._id == current_user._id) {
            a1.push(element);
          }
        });
      });
      for (let item of a1) {
        if (!a2.includes(item)) a2.push(item);
      }
      const ticketlist = [];
      a2.map((p) => {
        p.tickets.map((t) => {
          ticketlist.push(t);
        });
      });
      settickets(ticketlist);
    }

    setnewticketcheck(data.check);
  };

  return (
    <div className="h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />
      <div className={newticketcheck ? "hidden" : "flex flex-col mt-10"}>
        <div className="flex flex-row justify-between px-10">
          <h1 className="my-2 font-bold  text-gray-900  dark:text-white ">
            Tickets-List
          </h1>
          <button
            type="button"
            onClick={() => setnewticketcheck(true)}
            className=" flex flex-row text-white bg-blue-500 hover:bg-blue-700 font-sm rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800"
          >
            Ticket
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
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mt-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Project
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>

                <th scope="col" className="px-6 py-3">
                  Issued by
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, tid) => (
                <tr
                  key={tid}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {ticket.title}
                  </th>
                  <td className="px-6 py-4">{ticket.projectname}</td>
                  <td className="px-6 py-4">{ticket.status}</td>
                  <td className="px-6 py-4">{ticket.onlydate}</td>
                  <td className="px-6 py-4">{ticket.user}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
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
      <div
        className={
          newticketcheck
            ? "relative flex items-center justify-center"
            : "hidden"
        }
      >
        <button
          onClick={() => setnewticketcheck(false)}
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
        <Newticket onChange={(data) => handlechange(data)} />
      </div>
    </div>
  );
};

export default Tickets;
