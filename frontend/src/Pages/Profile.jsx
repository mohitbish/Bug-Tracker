import React, { useState } from "react";
import NavbarComponenet from "../Components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { updateprofile } from "../Routes/apiroute";

const Profile = () => {
  const [id, setid] = useState("");
  const [username, setusername] = useState("");
  const [email, seteamil] = useState("");
  const [role, setrole] = useState("");
  const [title, settitle] = useState("");
  const [admincheck, setadmincheck] = useState(false);

  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useState(() => {
    async function fetchdata() {
      const user = await JSON.parse(localStorage.getItem("current-user"));
      seteamil(user.email);
      setid(user._id);
      setrole(user.role);
      settitle(user.title);
      setusername(user.username);
      if (user.role == "admin") {
        setadmincheck(true);
      }
    }
    fetchdata();
  }, []);

  const updateuserinfo = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(updateprofile, {
      email,
      username,
      id,
      role,
      title,
    });

    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.success("updated", toastOptions);
      const user = data.user;
      console.log(user[0]);
      seteamil(user[0].email);
      setid(user[0]._id);
      setrole(user[0].role);
      settitle(user[0].title);
      setusername(user[0].username);
      localStorage.removeItem("current-user");
      localStorage.setItem("current-user", JSON.stringify(data.user[0]));
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-100 dark:bg-gray-700 pb-6">
      <NavbarComponenet />

      <div className="relative flex flex-col items-center justify-center w-ful pt-10">
        <h1 className="text-2xl uppercase font-bold my-4 dark:text-white">
          Edit info
        </h1>

        <form onSubmit={(e) => updateuserinfo(e)} className="w-2/5">
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
              value={email || ""}
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
              value={username || ""}
              onChange={(e) => setusername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {admincheck ? (
            <div className="mb-6">
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="roles"
                onChange={(e) => setrole(e.target.value)}
                placeholder={role || ""}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={role}>{role}</option>
                <option
                  value="admin"
                  className={role == "admin" ? "hidden" : ""}
                >
                  admin
                </option>
                <option value="user" className={role == "user" ? "hidden" : ""}>
                  user
                </option>
              </select>
            </div>
          ) : (
            <></>
          )}
          <div className="mb-6">
            <label
              htmlFor="titles"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <select
              id="titles"
              onChange={(e) => settitle(e.target.value)}
              placeholder={title || ""}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={title}>{title}</option>
              <option
                value="Designer"
                className={title == "Designer" ? "hidden" : ""}
              >
                Designer
              </option>
              <option
                value="Developer"
                className={title == "Developer" ? "hidden" : ""}
              >
                Developer
              </option>
              <option
                value="Product Manager"
                className={title == "Product Manager" ? "hidden" : ""}
              >
                Product Manager
              </option>
              <option
                value="Tester"
                className={title == "Tester" ? "hidden" : ""}
              >
                Tester
              </option>
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
    </div>
  );
};

export default Profile;
