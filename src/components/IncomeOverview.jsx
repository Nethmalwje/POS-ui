import {
  CalendarOutlined,
  LoadingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import { formattedDate } from "../helpers/formatDate";
import DashboardCards from "./DashboardCards";
import SalesPurchaseChart from "./SalesPurchaseChart";
import { useEffect, useState } from "react";
import TopSellingProductsChart from "./TopSellingProducts";
import MostPurchasedProductsChart from "./MostPurchasedProducts";
import { useQuery } from "react-query";

function IncomeOverview() {
  const today = new Date();
  const todayFormatted = formattedDate(today);
  const startDateFormatted = formattedDate(
    new Date(today.setFullYear(today.getFullYear() - 1))
  );
  const [endDate, setEndDate] = useState(todayFormatted);
  const [startDate, setStartDate] = useState(startDateFormatted);
  const [refresh, setRefresh] = useState(false);

  function handleChange(value) {
    const today = new Date(); // Always get a fresh instance of today
    setEndDate(formattedDate(today)); // Set the end date to today's date

    let newStartDate;
    if (value === "Today") {
      newStartDate = formattedDate(today); // Start and end are the same for today
    } else if (value === "Last 7 days") {
      const sevenDaysAgo = new Date(); // Create a new Date object
      sevenDaysAgo.setDate(today.getDate() - 7); // Set it to 7 days ago
      newStartDate = formattedDate(sevenDaysAgo);
    } else if (value === "Last Month") {
      const lastMonth = new Date(); // Create a new Date object
      lastMonth.setMonth(today.getMonth() - 1); // Set it to last month
      newStartDate = formattedDate(lastMonth);
    } else if (value === "Last Year") {
      const lastYear = new Date(); // Create a new Date object
      lastYear.setFullYear(today.getFullYear() - 1); // Set it to last year
      newStartDate = formattedDate(lastYear);
    }

    console.log(newStartDate);

    setStartDate(newStartDate); // Update the start date
  }

  // console.log("end date", endDate);
  // console.log("start date", startDate);

  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  // console.log(data);

  function handleRefresh() {
    setRefresh((refresh) => !refresh);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-poppins font-semibold">
          Income and Inventory Overview
        </h1>
        <div className="flex flex-row justify-end items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <h4 className="font-semibold font-poppins text-sm">
              <CalendarOutlined /> Select Date :{" "}
            </h4>
            <Select
              defaultValue="Last Year"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Today",
                  label: "Today",
                },
                {
                  value: "Last 7 days",
                  label: "Last 7 days",
                },
                {
                  value: "Last Month",
                  label: "Last Month",
                },
                {
                  value: "Last Year",
                  label: "Last Year",
                },
              ]}
            />
          </div>
          <Button type="primary" onClick={handleRefresh}>
            {/* {!isLoading ? <ReloadOutlined /> : <LoadingOutlined />} */}
            <ReloadOutlined />
            Refresh
          </Button>
        </div>
      </div>

      {/* {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && (
        <> */}
      <div className="flex flex-row gap-4">
        <DashboardCards
          startDate={startDate}
          endDate={endDate}
          refresh={refresh}
        />
      </div>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row items-center justify-between w-full bg-slate-50 rounded-xl p-4 border border-blue-400">
          <SalesPurchaseChart
            startDate={startDate}
            endDate={endDate}
            refresh={refresh}
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="w-1/2">
            <TopSellingProductsChart
              startDate={startDate}
              endDate={endDate}
              refresh={refresh}
            />
          </div>
          <div className="w-1/2">
            <MostPurchasedProductsChart refresh={refresh} />
          </div>
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
}

export default IncomeOverview;
