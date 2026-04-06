import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SalesTable from "./SalesTable";
import { getTransactions } from "../api/api";
import PurchaseTable from "./PurchaseTable";
const { RangePicker } = DatePicker;

function PurchaseComponent() {
  const [inventory, setInventory] = useState("All Inventories");

  const [dateRange, setDateRange] = useState([null, null]);
  const [formattedDateRange, setFormattedDateRange] = useState([
    dayjs().subtract(7, "day").format("YYYY-MM-DD"),
    dayjs().format("YYYY-MM-DD"),
  ]);

  //   useEffect(() => {
  //     // console.log("Formatted Dates: ", formattedDateRange);
  //     getPurchases(formattedDateRange, inventory);
  //   }, [formattedDateRange, inventory]);

  function handleDateChange(dates, dateStrings) {
    setDateRange(dates);
    setFormattedDateRange(dateStrings);
  }

  function handleChangeInventory(value) {
    setInventory((inventory) => value);
  }

  const inventories = [
    {
      value: "Inventory 1",
      label: "Inventory 1",
      inventory_id: 1,
    },
    {
      value: "Inventory 2",
      label: "Inventory 2",
      inventory_id: 2,
    },
    {
      value: "Inventory 3",
      label: "Inventory 3",
      inventory_id: 3,
    },
  ];

  return (
    <div className="mx-auto w-full">
      <div
        className="grid
          grid-cols-2
         items-center justify-between w-full gap-2"
      >
        <div className="flex flex-row items-center justify-start gap-4 w-full">
          <h4 className="font-semibold font-poppins text-sm">
            Select Date Range:
          </h4>
          <RangePicker onChange={handleDateChange} />
        </div>

        <div className="flex flex-row items-center justify-start gap-4 w-full">
          <h4 className="font-semibold font-poppins text-sm">
            Search By Inventory :-
          </h4>
          <Select
            defaultValue="All Inventories"
            style={{
              width: 130,
            }}
            onChange={handleChangeInventory}
            options={[
              {
                value: "All Inventories",
                label: "All Inventories",
              },
              ...inventories,
            ]}
          />
        </div>
      </div>

      <div className="mt-8">
        <PurchaseTable />
      </div>
    </div>
  );
}

export default PurchaseComponent;
