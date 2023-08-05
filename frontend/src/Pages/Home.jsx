import React, { useState, useEffect } from "react";
import NavbarComponenet from "../Components/Navbar";
import Chart from "react-apexcharts";

const Home = () => {

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

  const series = [52.8, 26.8, 20.4];

  return (
    <div className="w-full h-screen bg-blue-100 dark:bg-gray-700">
      <NavbarComponenet />
      <div className="grid grid-cols-2 justify-between p-6">
        <div class="flex flex-row items-start justify-start bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mr-6">
       
          <Chart
            options={options}
            series={series}
            type="pie"
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
