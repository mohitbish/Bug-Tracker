import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponenet from "../Components/Navbar";
import Chart from "react-apexcharts";
import { getprojects } from "../Routes/apiroute";
import { Link } from "react-router-dom";

const Home = () => {
  const [priorityseries, setpriorityseries] = useState([50, 40, 10]);
  const [statusseries, setstatusseries] = useState([50, 40, 10]);
  const [totaltickets, settotaltickets] = useState(1);
  const [totalprojects, settotalprojects] = useState(1);
  const [projpriorityseries, setprojpriorityseries] = useState([1, 1, 1]);
  const [projstatusseries, setprojstatusseries] = useState([1, 1, 1]);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const poptions = {
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["High", "Moderate", "Low"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
  const soptions = {
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["In-Progress", "Finished"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
  const projsoptions = {
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["On-going", "Upcoming"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("current-user"));

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

      const a1 = [];
      const a2 = [];
      sortedarry.forEach((element) => {
        const new_array = element.users;
        new_array.map((e) => {
          if (e._id === current_user._id) {
            a1.push(element);
          }
        });
      });
      for (let item of a1) {
        if (!a2.includes(item)) a2.push(item);
      }
      settotalprojects(a2.length);
      let plt = 0;
      let pmt = 0;
      let pht = 0;
      let pog = 0;
      let pup = 0;
      a2.map((p) => {
        if (p.priority === "low") {
          plt = plt + 1;
        }
        if (p.priority === "moderate") {
          pmt = pmt + 1;
        }
        if (p.priority === "high") {
          pht = pht + 1;
        }
        if (p.status === "on-going") {
          pog = pog + 1;
        }
        if (p.status === "upcoming") {
          pup = pup + 1;
        }
      });

      const sp = [
        Math.round((pht / a2.length) * 100),
        Math.round((pmt / a2.length) * 100),
        Math.round((plt / a2.length) * 100),
      ];
      const ssp = [
        Math.round((pog / a2.length) * 100),
        Math.round((pup / a2.length) * 100),
      ];
      setprojpriorityseries(sp);
      setprojstatusseries(ssp);

      // tickecharts charts data
      const ticketlist = [];
      a2.map((p) => {
        p.tickets.map((t) => {
          ticketlist.push(t);
        });
      });

      let lt = 0;
      let mt = 0;
      let ht = 0;
      let ip = 0;
      let fn = 0;
      // data for chart
      ticketlist.map((t) => {
        if (t.priority === "low") {
          lt = lt + 1;
        }
        if (t.priority === "moderate") {
          mt = mt + 1;
        }
        if (t.priority === "high") {
          ht = ht + 1;
        }
        if (t.status === "in-progress") {
          ip = ip + 1;
        }
        if (t.status === "Finished") {
          fn = fn + 1;
        }
      });
      const st = [
        Math.round((ht / ticketlist.length) * 100),
        Math.round((mt / ticketlist.length) * 100),
        Math.round((lt / ticketlist.length) * 100),
      ];
      const ss = [
        Math.round((ip / ticketlist.length) * 100),
        Math.round((fn / ticketlist.length) * 100),
      ];
      setpriorityseries(st);
      setstatusseries(ss);
      settotaltickets(ticketlist.length);
    }

    fetchdata();
  }, []);

  return (
    <div className="w-full min-h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />
      <div className="grid grid-cols-2 justify-between p-6">
        <div className="flex flex-row justify-between bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mr-6 mb-2">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-center font-semibold text-2xl dark:text-white text-black p-4">
              Tickets By Priority
            </h1>
            <ul className="flex flex-col p-4">
              <li className="m-2  font-medium dark:text-white text-black">
                High : {Math.round((priorityseries[0] * totaltickets) / 100)}
              </li>
              <li className="m-2 font-medium dark:text-white text-black">
                Moderate :{" "}
                {Math.round((priorityseries[1] * totaltickets) / 100)}
              </li>
              <li className="m-2 font-medium dark:text-white text-black">
                Low : {Math.round((priorityseries[2] * totaltickets) / 100)}
              </li>
            </ul>
            <Link
              to="/tickets"
              className="px-4 inline-flex text-blue-600 dark:text-blue-500 hover:underline"
            >
              Details
              <svg
                className="mt-1 ml-2 w-3 h-3 text-blue-600 dark:text-blue-500"
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
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
          <Chart
            options={poptions}
            series={priorityseries}
            type="pie"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-row justify-between bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 ml-6 mb-2">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-center font-semibold text-2xl dark:text-white text-black p-4">
              Tickets By Status
            </h1>
            <ul className="flex flex-col p-4">
              <li className="m-2  font-medium dark:text-white text-black">
                In-Progress :{" "}
                {Math.round((statusseries[0] * totaltickets) / 100)}
              </li>
              <li className="m-2 font-medium dark:text-white text-black">
                Finished : {Math.round((statusseries[1] * totaltickets) / 100)}
              </li>
            </ul>
            <Link
              to="/tickets"
              className="px-4 inline-flex text-blue-600 dark:text-blue-500 hover:underline"
            >
              Details
              <svg
                className="mt-1 ml-2 w-3 h-3 text-blue-600 dark:text-blue-500"
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
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
          <Chart
            options={soptions}
            series={statusseries}
            type="donut"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-row justify-between bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mr-6">
          <div className="flex flex-col">
            <h1 className="text-center font-semibold text-2xl dark:text-white text-black p-4">
              Projects By Priority
            </h1>
            <ul className="flex flex-col p-4">
              <li className="m-2  font-medium dark:text-white text-black">
                High :{" "}
                {Math.round((projpriorityseries[0] * totalprojects) / 100)}
              </li>
              <li className="m-2 font-medium dark:text-white text-black">
                Moderate :{" "}
                {Math.round((projpriorityseries[1] * totalprojects) / 100)}
              </li>
              <li className="m-2 font-medium dark:text-white text-black">
                Low :{" "}
                {Math.round((projpriorityseries[2] * totalprojects) / 100)}
              </li>
            </ul>
            <Link
              to="/projects"
              className="px-4 inline-flex text-blue-600 dark:text-blue-500 hover:underline"
            >
              Details
              <svg
                className="mt-1 ml-2 w-3 h-3 text-blue-600 dark:text-blue-500"
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
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
          <Chart
            options={poptions}
            series={projpriorityseries}
            type="pie"
            width={300}
            height={300}
          />
        </div>
        <div className="flex flex-row justify-between bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 ml-6">
          <div className="flex flex-col">
            <h1 className="text-center font-semibold text-2xl dark:text-white text-black p-4">
              Projects By Status
            </h1>
            <ul className="flex flex-col p-4">
              <li className="m-2  font-medium dark:text-white text-black">
                On-Going :{" "}
                {Math.round((projstatusseries[0] * totalprojects) / 100)}
              </li>
              <li className="m-2 font-medium dark:text-white text-black">
                Upcoming :{" "}
                {Math.round((projstatusseries[1] * totalprojects) / 100)}
              </li>
            </ul>
            <Link
              to="/projects"
              className="px-4 inline-flex text-blue-600 dark:text-blue-500 hover:underline"
            >
              Details
              <svg
                className="mt-1 ml-2 w-3 h-3 text-blue-600 dark:text-blue-500"
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
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
          <Chart
            options={projsoptions}
            series={projstatusseries}
            type="donut"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
