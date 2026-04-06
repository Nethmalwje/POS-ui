import React from "react";
import Chart from "react-apexcharts";

// Custom Legend Component
const CustomLegend = ({ labels, colors }) => {
  return (
    <div className="grid grid-cols-2 gap-4 font-poppins font-semibold text-xs">
      {labels.map((label, index) => (
        <div className="flex flex-row items-center" key={index}>
          <span
            className="rounded-full w-12 h-12 "
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              backgroundColor: colors[index],
              marginRight: "8px",
            }}
          ></span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

const RadialBarChart = () => {
  // Total number of employees
  const totalEmployees = 55;

  // Number of employees in each role
  const regionalManagers = 5;
  const storeManagers = 15;
  const inventoryManagers = 10;
  const cashiers = 25;

  // Calculate the percentage each role contributes to the total
  const series = [
    (regionalManagers / totalEmployees) * 100, // Percentage of Regional Managers
    (storeManagers / totalEmployees) * 100, // Percentage of Store Managers
    (inventoryManagers / totalEmployees) * 100, // Percentage of Inventory Managers
    (cashiers / totalEmployees) * 100, // Percentage of Cashiers
  ];

  // Define the labels and corresponding colors
  const labels = [
    `Regional Manager (${regionalManagers})`,
    `Store Manager (${storeManagers})`,
    `Inventory Manager (${inventoryManagers})`,
    `Cashier (${cashiers})`,
  ];

  const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560"];

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        track: {
          strokeWidth: "100%", // Makes the background track thicker
        },
        dataLabels: {
          name: {
            fontSize: "16px",
          },
          value: {
            fontSize: "14px",
            formatter: function (val, opts) {
              const index = opts.seriesIndex;
              const employeeCounts = [
                regionalManagers,
                storeManagers,
                inventoryManagers,
                cashiers,
              ];
              return employeeCounts[index];
            },
          },
          total: {
            show: true,
            label: "Total Employees",
            formatter: function () {
              return totalEmployees; // Display the total number of employees in the center
            },
          },
        },
        hollow: {
          size: "50%", // Adjust the hollow size, making the bar relatively thicker
        },
      },
    },
    labels,
    colors,

    tooltip: {
      enabled: true,
      y: {
        formatter: function (val, opts) {
          const index = opts.seriesIndex;
          const employeeCounts = [
            regionalManagers,
            storeManagers,
            inventoryManagers,
            cashiers,
          ];
          return `${employeeCounts[index]} employees`;
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Render the RadialBar Chart */}
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={400} // Adjust the height
        width={400} // Adjust the width
      />

      {/* Render the custom legend below the chart */}
      <CustomLegend labels={labels} colors={colors} />
    </div>
  );
};

export default RadialBarChart;
