import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponenet from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addnewcomment } from "../Routes/apiroute";

const TicketDetail = () => {
  const navigate = useNavigate();
  const [status, setstatus] = useState("");
  const [ticket, setticket] = useState({});
  const [comments, setcomments] = useState([]);
  const [newcomment, setnewcomment] = useState("");
  const [user, setuser] = useState("");
  const [fileurl, setfileurl] = useState("");
  const date = new Date();
  const fulldate = date.toString();
  const [currentpage, setcureentpage] = useState(1);
  const commentperpage = 4;
  const lastindex = currentpage * commentperpage;
  const firstindex = lastindex - commentperpage;
  const records = comments.slice(firstindex, lastindex);
  const npage = Math.ceil(comments.length / commentperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    setticket(JSON.parse(localStorage.getItem("current-ticket")));
    setuser(JSON.parse(localStorage.getItem("current-user")).username);
    const url = JSON.parse(localStorage.getItem("current-ticket")).file;
    console.log(url)
    setfileurl(`http://localhost:8888/${url}`);
    const commentsarray = JSON.parse(
      localStorage.getItem("current-ticket")
    ).comments;
    const sortedarry = commentsarray.sort(function (a, b) {
      var c = new Date(a.date);
      var d = new Date(b.date);
      return d - c;
    });
    setcomments(sortedarry);
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

  const handlenewcomment = async () => {
    const { data } = await axios.post(addnewcomment, {
      newcomment,
      user,
      projectname: ticket.projectname,
      fulldate,
      title: ticket.title,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      const sortedarry = data.commentdata.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return d - c;
      });
      setnewcomment("");
      setcomments(sortedarry);
    }
  };

  return (
    <>
      <div className="relative w-full min-h-screen bg-blue-100 dark:bg-gray-700 pb-4">
        <NavbarComponenet />

        <div className="relative w-full flex flex-row justify-around pt-8">
          <button
            onClick={() => {
              navigate("/tickets");
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
          {/* ticket details */}
          <div className="w-2/5 items-center pt-6">
            <form
              //onSubmit={(event) => handlesubmit(event)}
              className="w-3/5 ml-14"
            >
              {/*  */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={ticket.title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="title"
                  value={ticket.status}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="priority"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Priority
                </label>
                <input
                  type="text"
                  id="title"
                  value={ticket.priority}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="issued on"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Issued on
                </label>
                <input
                  type="text"
                  id="issued on"
                  value={ticket.onlydate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="issued by"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Issued By
                </label>
                <input
                  type="text"
                  id="issued by"
                  value={ticket.user}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="projname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project-Name
                </label>
                <input
                  type="text"
                  id="projname"
                  value={ticket.projectname}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {ticket.file != undefined ? (
                <div className="mb-6">
                  <label
                    className="flex flex-row justify-between mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="user_avatar"
                  >
                    {ticket.file}
                    <a href={fileurl} target="_blank">
                      <svg
                        className="w-4 h-4 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 19"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"
                        />
                      </svg>
                    </a>
                  </label>
                </div>
              ) : (
                <div className="mb-6">
                  <label
                    className="flex flex-row justify-between mb-4 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="user_avatar"
                  >
                    No file attached
                  </label>
                </div>
              )}
            </form>
          </div>
          {/* comments history and new form */}
          <div className="w-3/5 pt-6 pr-10">
            <h1 className=" dark:text-white text-center font-medium text-black">
              {ticket.title} - Comment History
            </h1>
            {/* comments table  */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Comment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Made by
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((comment, cid) => (
                    <tr
                      key={cid}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {comment.comment}
                      </th>
                      <td className="px-6 py-4">{comment.user}</td>
                      <td className="px-6 py-4">
                        {comment.date.substring(4, 15)}
                      </td>
                      <td className="px-6 py-4">
                        {comment.date.substring(16, 21)}
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
            <h1 className=" dark:text-white text-center font-medium text-black mt-10">
              Add new comment to {ticket.title}
            </h1>
            <form className="mb-2">
              <div className="flex flex-row justify-between pb-1">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your message
                </label>
                <button
                  type="button"
                  onClick={() => handlenewcomment()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Post
                </button>
              </div>
              <textarea
                id="message"
                rows="2"
                value={newcomment}
                onChange={(e) => setnewcomment(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketDetail;
