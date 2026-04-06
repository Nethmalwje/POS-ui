import dayjs from "dayjs";
import Chart from "react-apexcharts";
import { purchases } from "../helpers/lists";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { generateDateRange } from "../helpers/generateDateRange";
import { generateHourRange } from "./../helpers/generateHourRange";
import utc from "dayjs/plugin/utc";
import { Hourglass } from "react-loader-spinner";
dayjs.extend(utc);

function SalesPurchaseChart({ startDate, endDate, refresh }) {
  const defaultStartDate = "2023-01-01";
  const defaultendDate = "2023-12-31";

  const [totalSales, setTotalSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      try {
        const salesDataResponse = await axiosInstance.get(
          `http://localhost:49164/daily-total-sales?startDate=${startDate}&endDate=${endDate}`
        );

        setTotalSales(salesDataResponse.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [refresh, startDate, endDate]);

  const minDate = dayjs(totalSales[0]?.date).format("YYYY-MM-DD");
  const maxDate = dayjs(totalSales[totalSales.length - 1]?.date).format(
    "YYYY-MM-DD"
  );

  // Detect the data range
  const dateDifference = dayjs(maxDate).diff(dayjs(minDate), "day");

  // Variables to be adjusted based on the view
  let xaxisFormat = "MMM yyyy"; // Default for yearly overview
  let tickAmount = 12; // Default tick amount for yearly data
  let salesData = [];
  let purchasesData = [];
  let rotateLabels = 0; // Default no rotation for year view

  // Modify the X-axis and data based on the detected range
  if (dateDifference <= 1) {
    // For today overview, show time (24 hours)
    const today = dayjs(minDate).format("YYYY-MM-DD");
    const hourRange = generateHourRange(today);

    // Fill sales and purchases data for 24 hours
    salesData = hourRange.map((hour) => {
      const saleEntry = totalSales.find(
        (entry) => dayjs(entry.date).format("YYYY-MM-DD HH:mm") === hour
      );
      return { x: dayjs(hour).valueOf(), y: saleEntry ? saleEntry.amount : 0 };
    });

    purchasesData = hourRange.map((hour) => {
      const purchaseEntry = purchases.find(
        (entry) => dayjs(entry.date).format("YYYY-MM-DD HH:mm") === hour
      );
      return {
        x: dayjs(hour).valueOf(),
        y: purchaseEntry ? purchaseEntry.amount : 0,
      };
    });

    xaxisFormat = "HH:mm";
    tickAmount = 24; // Show all 24 hours
    rotateLabels = -45;
  } else if (dateDifference <= 7) {
    // For weekly overview, show all days
    const dateRange = generateDateRange(minDate, maxDate);

    salesData = dateRange.map((date) => {
      const saleEntry = totalSales.find(
        (entry) => dayjs(entry.date).format("YYYY-MM-DD") === date
      );
      return { x: dayjs(date).valueOf(), y: saleEntry ? saleEntry.amount : 0 };
    });

    purchasesData = dateRange.map((date) => {
      const purchaseEntry = purchases.find(
        (entry) => dayjs(entry.date).format("YYYY-MM-DD") === date
      );
      return {
        x: dayjs(date).valueOf(),
        y: purchaseEntry ? purchaseEntry.amount : 0,
      };
    });

    xaxisFormat = "dd MMM";
    tickAmount = 7; // Show 7 days
    rotateLabels = -45;
  } else if (dateDifference <= 31) {
    // For monthly overview, show all days
    const dateRange = generateDateRange(minDate, maxDate);

    salesData = dateRange.map((date) => {
      const saleEntry = totalSales.find(
        (entry) => dayjs(entry.date).format("YYYY-MM-DD") === date
      );
      return {
        x: dayjs(date).valueOf(),
        y: saleEntry ? saleEntry.amount : 0,
      };
    });

    purchasesData = dateRange.map((date) => {
      const purchaseEntry = purchases.find(
        (entry) => dayjs(entry.date).format("YYYY-MM-DD") === date
      );
      return {
        x: dayjs(date).valueOf(),
        y: purchaseEntry ? purchaseEntry.amount : 0,
      };
    });

    xaxisFormat = "dd MMM";
    tickAmount = 30; // Show 30 or 31 days
    rotateLabels = -45;
  } else {
    // For yearly overview, show month/year
    salesData = totalSales.map((entry) => ({
      x: dayjs.utc(entry.date).startOf("day").valueOf(), // Ensure date is treated as UTC and start of the day
      y: entry.amount,
    }));

    purchasesData = purchases.map((entry) => ({
      x: dayjs.utc(entry.date).startOf("day").valueOf(), // Ensure date is treated as UTC and start of the day
      y: entry.amount,
    }));

    xaxisFormat = "MMM yyyy";
    tickAmount = 12; // Show 12 months
  }

  // Y-axis range calculation
  const allAmounts = [
    ...salesData.map((s) => s.y),
    ...purchasesData.map((p) => p.y),
  ];

  const yMin = Math.floor(Math.min(...allAmounts) / 100) * 100;
  const yMax = Math.ceil(Math.max(...allAmounts) / 100) * 100;

  function getDynamicFilename() {
    const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
    return `Sales_Purchases_Overview_${timestamp}`;
  }

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: { enabled: true },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        export: {
          csv: {
            filename: getDynamicFilename(),
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toLocaleDateString();
            },
          },
          svg: {
            filename: getDynamicFilename(),
          },
          png: {
            filename: getDynamicFilename(),
          },
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      min: dayjs(minDate).valueOf(),
      max: dayjs(maxDate).valueOf(),
      labels: {
        format: xaxisFormat,
        rotate: rotateLabels,
        style: {
          fontSize: "12px",
        },
      },
      tickPlacement: "on",
      tickAmount: tickAmount,
      title: {
        text: "Date/Time",
        style: {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          margin: 10,
        },
      },
      axisTicks: {
        show: true,
        height: 6,
      },
      axisBorder: {
        show: true,
        color: "#78909C",
      },
    },
    yaxis: {
      title: {
        text: "Sales and Purchases Amount (Rs.)",
        style: {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
        },
      },
      min: yMin,
      max: yMax,
      tickAmount: (yMax - yMin) / 200,
      labels: {
        formatter: function (value) {
          return Math.round(value);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Sales and Purchases Overview",
      align: "left",
      style: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "top",
    },
    colors: ["#0090FF", "#00E396"],
    tooltip: {
      shared: true,
      x: {
        format: dateDifference <= 1 ? "HH:mm" : "MMM dd, yyyy", // Show time for daily view, full date otherwise
      },
      y: {
        formatter: (value) => `Rs.${value}`,
      },
    },
  };

  // Series data
  const series = [
    {
      name: "Sales",
      data: salesData,
    },
    {
      name: "Purchases",
      data: purchasesData,
    },
  ];

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[350px]">
        <Hourglass />
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default SalesPurchaseChart;
