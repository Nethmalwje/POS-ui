import { AccountBookOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import SalesComponent from "../components/SalesComponent";
import PurchaseComponent from "../components/PurchaseComponent";

const items = [
  {
    label: (
      <div className="font-poppins font-semibold">
        <MoneyCollectOutlined /> Sales Transactions
      </div>
    ),
    key: "1",
    children: (
      <div className="flex flex-col items-center justify-start w-full">
        <SalesComponent />
      </div>
    ),
  },
  {
    label: (
      <div className="font-poppins font-semibold">
        <AccountBookOutlined /> Purchase Transactions
      </div>
    ),
    key: "2",
    children: (
      <div className="flex flex-col items-center justify-start w-full">
        <PurchaseComponent />
      </div>
    ),
  },
];

function Transaction() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        View Transactions
      </h1>
      <div>
        <Tabs defaultActiveKey="1" centered type="card" items={items} />
      </div>
    </div>
  );
}

export default Transaction;
