import React from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import NavbarComponenet from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <Flowbite>
        <div className="flex flex-row">
          <NavbarComponenet />
          <DarkThemeToggle />
        </div>
      </Flowbite>
    </>
  );
};

export default Home;
