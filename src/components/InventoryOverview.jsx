import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Card from "./Cards";
import { useState } from "react";

const InventoryOverview = (filter) => {
  const [totalSent, setTotalSent] = useState("258000.00");
  const [totalAdded, setTotalAdded] = useState("132000.00");
  const [stocksSent, setStocksSent] = useState("2578");
  const [stocksAdded, setStocksAdded] = useState("630");
  return (
    <div>
      <div>
        <h2 className="text-lg font-poppins font-semibold">
          Inventory Overall
        </h2>
      </div>
      <div className=" flex gap-5 pt-5">
        <Card
          title="Total Sent"
          amount={`Rs. ${totalSent}`}
          colour={" bg-green-300"}
          outerColour={" bg-green-100"}
          icon={<UpOutlined />}
          className=" lg:w-1/4 md:w-1/3 sm:w-full"
        />
        <Card
          title="Total Added"
          amount={`Rs. ${totalAdded}`}
          colour={" bg-yellow-300"}
          outerColour={" bg-yellow-100"}
          icon={<DownOutlined />}
          className=" lg:w-1/4 md:w-1/3 sm:w-full"
        />
        <Card
          title="Stocks Sent"
          amount={stocksSent}
          colour={" bg-green-300"}
          outerColour={" bg-green-100"}
          icon={<UpOutlined />}
          className=" lg:w-1/4 md:w-1/3 sm:w-full"
        />
        <Card
          title="Stocks Added"
          amount={stocksAdded}
          colour={" bg-yellow-300"}
          outerColour={" bg-yellow-100"}
          icon={<DownOutlined />}
          className=" lg:w-1/4 md:w-1/3 sm:w-full"
        />
      </div>
    </div>
  );
};

export default InventoryOverview;
