import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { products } from "../helpers/lists";
import axiosInstance from "../api/axiosConfig";
import { Hourglass } from "react-loader-spinner";

function TopSellingProductsChart({ startDate, endDate, refresh }) {
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      setLoading(true);
      try {
        const topSellingProductsResponse = await axiosInstance.get(
          `http://localhost:49164/top-selling-products?startDate=${startDate}&endDate=${endDate}`
        );

        setMostSoldProducts(topSellingProductsResponse.data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, [refresh, startDate, endDate]);

  const colorpalatte = mostSoldProducts.reduce((acc, product, index) => {
    const color =
      ["#0090FF", "#00E396", "#FEB019", "#FF4560", "#775DD0"][index] ||
      "#000000"; // Default to black if more than 4
    acc[product.product_name] = color;
    return acc;
  }, {});

  // Prepare labels and amounts for the chart
  const productNames = mostSoldProducts.map((product) => product.product_name);
  const productAmounts = mostSoldProducts.map((product) =>
    parseInt(product.total_quantity)
  );

  // Calculate total sales for percentage calculations
  const totalUnitsSold = productAmounts.reduce((a, b) => a + b, 0);

  // Handle case when productSales array might be empty or undefined
  if (productNames.length === 0 || productAmounts.length === 0) {
    return (
      <div className="items-center text-center">
        No product sales data available
      </div>
    );
  }

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: productNames,
    title: {
      text: "Top Selling Products",
      align: "center",
      style: {
        fontFamily: "Poppins, sans-serif",
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    legend: {
      show: false,
    },
    fill: {
      type: "solid",
    },
    colors: ["#0090FF", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const seriesIndex = opts.seriesIndex;
        const percentage =
          (opts.w.globals.series[seriesIndex] / totalUnitsSold) * 100;
        return percentage.toFixed(1) + "%";
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} units`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => `${totalUnitsSold} units`,
            },
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-50 min-h-[300px]">
        <Hourglass />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-slate-50">
      <div className="flex flex-row p-6 items-center justify-center gap-4 w-full border border-blue-500 rounded-lg">
        <Chart
          options={chartOptions}
          series={productAmounts}
          type="donut"
          height={300}
        />
        <Legend colorpalatte={colorpalatte} />
      </div>
    </div>
  );
}

export default TopSellingProductsChart;

const Legend = ({ colorpalatte }) => {
  return (
    <div className="flex flex-col space-y-2">
      {Object.entries(colorpalatte).map(([product, color]) => (
        <div key={product} className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-xs font-semibold font-poppins">{product}</span>
        </div>
      ))}
    </div>
  );
};
