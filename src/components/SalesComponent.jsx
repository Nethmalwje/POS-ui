import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SalesTable from "./SalesTable";
import axiosInstance from "../api/axiosConfig";

const { RangePicker } = DatePicker;

function SalesComponent() {
  const defaultStartDate = dayjs().subtract(1, "year");
  const defaultEndDate = dayjs();

  const [isSelectStore, setIsSelectStore] = useState(false);
  const [error, setError] = useState(null);

  // Remove when integrating with backend !!!!!!!!
  const stores = [
    {
      location_id: 0,
      name: "All Stores",
    },
    {
      location_id: 1,
      name: "Pitakotte",
    },
    {
      location_id: 2,
      name: "Nugegoda High Level Road",
    },
    {
      location_id: 3,
      name: "Kandy City Center",
    },
    {
      location_id: 4,
      name: "Ratnapura Municipal Commercial Complex",
    },
    {
      location_id: 5,
      name: "Badulla Dharmaduta Road",
    },
  ];
  // Remove when integrating with backend !!!!!!!!

  // const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState({
    location_id: 0,
    name: "All Stores",
  });
  const [cashier, setCashier] = useState("All Cashiers");
  const [dateRange, setDateRange] = useState([null, null]);

  // useEffect(() => {
  //   const fetchStores = async () => {
  //     try {
  //       const storesResponse = await axiosInstance.get(
  //         "http://localhost:49162/stores"
  //       );

  //       setStores(storesResponse.data);
  //     } catch (error) {
  //       setError(error);
  //       console.log(error);
  //     }
  //   };

  //   fetchStores();
  // }, []);

  function handleDateChange(dates, dateStrings) {
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([null, null]);
    }
  }

  function handleChangeStore(value) {
    const selected = stores.find((store) => store.location_id === value);
    setSelectedStore(selected);
  }

  function handleChangeCashier(value) {
    setCashier(value);
  }

  const cashiers = {
    "Store 1": ["Cashier 1", "Cashier 2", "Cashier 3"],
    "Store 2": ["Cashier 4", "Cashier 5", "Cashier 6"],
    "Store 3": ["Cashier 7", "Cashier 8", "Cashier 9"],
  };

  return (
    <div className="mx-auto w-full">
      <div
        className={`grid ${
          isSelectStore
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        } items-center justify-between w-full gap-4`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full">
          <h4 className="font-semibold font-poppins text-sm">
            Select Date Range:
          </h4>
          <RangePicker onChange={handleDateChange} value={dateRange} />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full">
          <h4 className="font-semibold font-poppins text-sm">
            Search By Store:
          </h4>
          <Select
            defaultValue="All Stores"
            style={{ width: 120 }}
            onChange={handleChangeStore}
            options={stores.map((store) => ({
              value: store.location_id, // Using location_id as value
              label: store.name, // Using name as label
            }))}
          />
        </div>

        {isSelectStore && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full">
            <h4 className="font-semibold font-poppins text-sm">
              Cashier Name:
            </h4>
            <Select
              value={cashier}
              style={{ width: 120 }}
              onChange={handleChangeCashier}
              options={[
                { value: "All Cashiers", label: "All Cashiers" },
                ...cashiers[selectedStore].map((cashier) => ({
                  value: cashier,
                  label: cashier,
                })),
              ]}
            />
          </div>
        )}
      </div>

      <div className="mt-8 w-full">
        <SalesTable
          startDate={dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : null}
          endDate={dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : null}
          storeId={selectedStore.location_id}
        />
      </div>
    </div>
  );
}

export default SalesComponent;
