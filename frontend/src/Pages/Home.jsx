import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarComponenet from "../Components/Navbar";
import Chart from "react-apexcharts";
import { getprojects } from "../Routes/apiroute";

const Home = () => {

  const [series, setseries] = useState([50, 40, 10]);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const options = {
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
          if (e._id == current_user._id) {
            a1.push(element);
          }
        });
      });
      for (let item of a1) {
        if (!a2.includes(item)) a2.push(item);
      }
      // setProjects(a2);

      // tickecharts charts data
      const ticketlist = [];
      a2.map((p) => {
        p.tickets.map((t) => {
          ticketlist.push(t);
        });
      });
      
      let lt = 0
      let mt = 0
      let ht = 0
      // data for chart
      ticketlist.map((t) => {
        if (t.priority == "low") {
          lt = lt+1
        }
        if (t.priority == "moderate") {
          mt = mt +1
        }
        if (t.priority == "high") {
          ht = ht+1
        }
      });
      const s = [
              (ht / ticketlist.length) * 100,
              (mt / ticketlist.length) * 100,
              (lt / ticketlist.length) * 100,
            ];
      setseries(s);
    }

    fetchdata();
  }, []);




  return (
    <div className="w-full min-h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />
      <div className="grid grid-cols-2 justify-between p-6">
        <div class="flex flex-row items-start justify-start bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mr-6">
          <Chart
            options={options}
            series={series}
            type="donut"
            width={500}
            height={320}
          />
          <h1 className=" dark:text-white text-black">Add Users to </h1>
        </div>
        <div class="bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 ml-6">
          <Chart
            options={options}
            series={series}
            type="pie"
            width={500}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
