import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectTickets = () => {
  const navigate = useNavigate()
  const [tickets, settickets] = useState([]);
  const [projname, setprojname] = useState("");
  const [currentpage, setcureentpage] = useState(1);
  const tickersperpage = 6;
  const lastindex = currentpage * tickersperpage;
  const firstindex = lastindex - tickersperpage;
  const records = tickets.slice(firstindex, lastindex);
  const npage = Math.ceil(tickets.length / tickersperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    const proj = JSON.parse(localStorage.getItem("current-project"));
    setprojname(proj.name);
    settickets(proj.tickets);
  }, []);
  console.log(tickets);
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

  const showticket = (ticket) => {
    localStorage.removeItem("current-ticket");
    localStorage.setItem("current-ticket", JSON.stringify(ticket));
    navigate("/ticketdetail");
  };
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-center dark:text-white text-black">
        Tickets for {projname}
      </h1>
      {/* table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Issued on
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
            {records.map((ticket, tid) => (
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
                <td className="px-6 py-4">{ticket.onlydate}</td>
                <td className="px-6 py-4">{ticket.user}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => showticket(ticket)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Details
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
  );
};

export default ProjectTickets;
