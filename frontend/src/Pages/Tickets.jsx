import React from "react";
import NavbarComponenet from "../Components/Navbar";
import Newticket from "../Components/Newticket";

const Tickets = () => {
  return (
    <div className="h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />
      <div className="flex items-center justify-center">
        <Newticket />
      </div>
      
    </div>
  );
};

export default Tickets;
