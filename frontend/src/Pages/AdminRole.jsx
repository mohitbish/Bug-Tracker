import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponenet from "../Components/Navbar";
import UserTable from "../Components/Users/UserTable";
import {getusers} from "../Routes/apiroute"


const AdminRole = () => {

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };


  const[users,setusers]=useState([]);
  const [edituser,setedituser ] = useState({});

  useEffect(() => {
    async function fetchUsers() {
      let response = await axios.get(getusers)
      if (response.data.status === false) {
        toast.error(response.data.msg, toastOptions);
      }
      setusers(response.data.users)
    }
    fetchUsers()
  }, [])


  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-700">
      <NavbarComponenet />
      <UserTable data={users}/>
      <ToastContainer />
    </div>
  );
};

export default AdminRole;
