import React from "react";
import IncomeOverview from "./IncomeOverview";
import UsersOverview from "./UsersOverview";
import TopStores from "./TopStores";
import InventoryOverview from "./InventoryOverview";
import {
  FilterFilled,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Pagination } from "antd";
import ExpiringOverview from "./ExpiringOverview";
import NewlyAddedStocks from "./NewlyAddedStocks";
import TopSelling from "./TopSelling";
import StockList from "./StockList";

const filterOptions = [
  { key: "Today", value: "today" },
  { key: "This Week", value: "this_week" },
  { key: "This Month", value: "this_month" },
  { key: "This Year", value: "this_year" },
  { key: "All", value: "all" },
];

const InventoryDashboard = () => {
  return (
    <div className=" p-5">
      <div className=" flex justify-between items-center">
        <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
          Inventory Dashboard
        </h1>
        <div className="flex items-center">
          <div>
            <label htmlFor="filter" className=" mr-2 font-medium">
              <FilterFilled />
              {" Filter:"}
            </label>
            <select
              id="filter"
              // value={filter}
              // onChange={handleFilterChange}
              className="border rounded p-2"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              ))}
            </select>
          </div>
          <div className=" pl-5">
            <Button type="primary">
              <ReloadOutlined />
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <StockList />
      <InventoryOverview />
      <TopStores />
      <TopSelling />
      <ExpiringOverview />
      <NewlyAddedStocks />
    </div>
  );
};

// const InventoryDashboard = () => {
//   return (
//     <div className="m-4 overflow-y-scroll">
//       <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
//         Inventory Dashboard
//       </h1>
//       <div className="flex flex-col gap-10">
//         <IncomeOverview />
//         <UsersOverview />
//       </div>
//     </div>
//   );
// };

export default InventoryDashboard;
