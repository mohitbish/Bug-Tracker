import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getprojects, addticket, addticketwithfile } from "../Routes/apiroute";

const Newticket = (props) => {
  const [projects, setProjects] = useState([]);
  const [status, setstatus] = useState("in-progress");
  const [projname, setprojname] = useState("");
  const [title, settitle] = useState("");
  const [comment, setcomment] = useState("");
  const [username, setusername] = useState("");
  const [priority, setpriority] = useState("low");
  const date = new Date();
  const onlydate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const fulldate = date.toString();
  const [file, setFile] = useState();
  const inputRef = useRef(null);

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

  const inputvalidation = () => {
    if (title == "") {
      toast.error("please provide a title", toastOptions);
      return false;
    } else if (projname == "") {
      toast.error("please select a project", toastOptions);
      return false;
    } else if (comment == "") {
      toast.error(
        "please provide brief description in comment box",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handlesubmit = async (event) => {
    //inputvalidation()
    console.log(file);
    event.preventDefault();
    if (inputvalidation()) {
      if (file != undefined) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("projname", projname);
        formData.append("status", status);
        formData.append("username", username);
        formData.append("comment", comment);
        formData.append("fulldate", fulldate);
        formData.append("onlydate", onlydate);
        formData.append("priority", priority);

        const { data } = await axios.post(addticketwithfile, formData);
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
          setstatus("in-progress");
          setprojname("");
          settitle("");
          setcomment("");
          setFile();
          inputRef.current.value = null;
          toast.success("added", toastOptions);
          props.onChange({ value: sortedarry, check: false });
        }
      } else {
        const { data } = await axios.post(addticket, {
          title,
          projname,
          status,
          username,
          comment,
          fulldate,
          onlydate,
          priority,
        });
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
          setstatus("in-progress");
          setprojname("");
          settitle("");
          setcomment("");
          setFile();
          inputRef.current.value = null;
          toast.success("added", toastOptions);
          props.onChange({ value: sortedarry, check: false });
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={(event) => handlesubmit(event)} className="w-1/2 mt-10">
        <div className="mb-4">
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
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select
            id="Status"
            onChange={(e) => setstatus(e.target.value)}
            value={status}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="In-progress">In-progress</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Priority
          </label>
          <select
            id="priority"
            onChange={(e) => setpriority(e.target.value)}
            value={status}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
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
            ref={inputRef}
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
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            value={comment}
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
