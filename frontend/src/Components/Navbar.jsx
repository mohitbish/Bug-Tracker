
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../Assets/logo.png";

const NavbarComponenet = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
  };

  return (
    <div className="w-full">
      <Navbar fluid rounded>
        <div className="flex flex-row mx-2">
          <Navbar.Brand>
            <img alt="Logo" className="mr-3 h-6 sm:h-9" src={logo} />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Bug-Tracker
            </span>
          </Navbar.Brand>
        </div>

        <div>
          <Navbar.Collapse>
            <Navbar.Link active href="#">
              <p>Home</p>
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Projects</Navbar.Link>
            <Navbar.Link href="#">Tickets</Navbar.Link>
            <Navbar.Link href="#">Profile</Navbar.Link>
          </Navbar.Collapse>
        </div>
        <div className="flex md:order-2 ">
          <Button onClick={() => logout()}>Logout</Button>
          <Navbar.Toggle />
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarComponenet;
