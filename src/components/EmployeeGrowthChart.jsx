import React from "react";
import Chart from "react-apexcharts";

function EmployeeGrowthChart() {
  const growth = [
    { role: "Regional Manager", growth: 4.5 },
    { role: "Store Manager", growth: 2.1 },
    { role: "Inventory Manager", growth: -1.3 },
    { role: "Cashier", growth: 5.7 },
  ];

  const roles = growth.map((item) => item.role);
  const growthValues = growth.map((item) => item.growth);

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
        distributed: true, // Distribute colors across bars
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val}%`;
      },
    },
    xaxis: {
      categories: roles, // Role names
      title: {
        text: "Roles",
        style: {
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
        },
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Growth (%)",
        style: {
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    colors: ["#00E396", "#FEB019", "#FF4560", "#008FFB"], // Assign colors for the bars
    title: {
      text: "Employee Growth by Role - Last Month",
      align: "center",
      style: {
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
      },
    },
  };

  const series = [
    {
      name: "Employee Growth",
      data: growthValues, // Growth values for each role
    },
  ];

  return (
    <div className="flex justify-center items-center">
      {/* Render the bar chart */}
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={500} // Adjust the width of the chart
      />
    </div>
  );
}

export default EmployeeGrowthChart;
