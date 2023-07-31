import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getprojects, addticket } from "../Routes/apiroute";

const Newticket = (props) => {
  const [projects, setProjects] = useState([]);
  const [priority, setpriority] = useState("low");
  const [projname, setprojname] = useState("");
  const [title, settitle] = useState("");
  const [comment, setcomment] = useState("");
  const [username, setusername] = useState("");
  const date = new Date();
  const onlydate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const fulldate = date.toString();
  const [file, setFile] = useState();

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));
    setusername(current_user.username);
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

      if (current_user.role === "user") {
        const a1 = [];
        const a2 = [];
        sortedarry.forEach((element) => {
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
        setProjects(a2);
      } else {
        setProjects(sortedarry);
      }
    }
    fetchdata();
  }, []);

  const handlesubmit = async (event) => {
    //inputvalidation()
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("projname", projname);
    formData.append("priority", priority);
    formData.append("username", username);
    formData.append("comment", comment);
    formData.append("fulldate", fulldate);
    formData.append("onlydate", onlydate);

    const { data } = await axios.post(addticket, formData);
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      console.log(data.tickets);

      const sortedarry = data.tickets.sort(function (a, b) {
        var c = new Date(a.fulldate);
        var d = new Date(b.fulldate);
        return d - c;
      });
      setpriority("low");
      setprojname("");
      settitle("");
      setcomment("");
      setusername("");
      setFile();
      toast.success("added", toastOptions);
      props.onChange({ value: sortedarry, check: false });
    }
  };

  return (
    <>
      <form onSubmit={(event) => handlesubmit(event)} className="w-1/2 mt-10">
        <div className="mb-6">
          <label
            htmlFor="project"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project
          </label>
          <select
            id="project"
            onChange={(e) => setprojname(e.target.value)}
            value={projname}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a project</option>
            {projects.map((proj, projid) => (
              <option key={projid} value={proj.name}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            onChange={(e) => settitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="priority"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Priority
          </label>
          <select
            id="priority"
            onChange={(e) => setpriority(e.target.value)}
            value={priority}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="low">low</option>
            <option value="moderate">moderate</option>
            <option value="high">high</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Please upload any supporting documents
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            onChange={(e) => setcomment(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Newticket;
