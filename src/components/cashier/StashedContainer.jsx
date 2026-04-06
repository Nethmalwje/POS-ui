import React, { useState } from "react";
import { Button, Popconfirm, Popover } from "antd";
//import userProfile from "../assets/default_user.png";
//import userProfile from "../../../public/default_user.png";

function StashedContainer({
  id,
  customer,
  customerPic,
  total,
  timestamp,
  removeStashed,
  proceedStashed,
}) {
  const [billId, setCustomerId] = useState(23635);
  const [customerName, setCustomerName] = useState("_");
  //const [customerProfile, setCustomerProfile] = useState(userProfile);
  const [totalAmount, setTotalAmount] = useState("238.50");
  const [stashedOn, setStashedOn] = useState("16:57:23 9/21/2024");

  const handleRemoveClick = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stashed bill?"
    );
    if (confirmed) {
      removeStashed(id);
    }
  };

  return (
    <div
      className="p-5 border  rounded-lg hover:shadow-xl"
      style={{ borderColor: "#1677ff" }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="pr-2 min-w-0">
          <div className="flex text-lg">
            <div className="font-bold">{id}</div>
          </div>
          <div className="flex text-sm font-light text-gray-600">
            <div className="w-20">Customer:</div>
            <div>Guest</div>
            {/* <div>{customer}</div> */}
          </div>
          <div className="flex text-gray-600">
            <div className="w-20 text-sm font-light">Total:</div>
            <div className="text-sm font-bold">Rs: {total}</div>
          </div>
          <div className="flex mt-6 text-xs font-light text-gray-400">
            <div className="min-w-16">Stashed on:</div>
            <div>{timestamp}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-4 md:mt-0 md:min-w-28">
          <div className="w-20 h-20 mb-2">
            <img
              className="w-20 h-20 rounded-full"
              src={"/default_user.png"}
              alt="user profile"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <Popconfirm
              title={"Are you sure want to remove stashed bill?"}
              onConfirm={() => {
                removeStashed(id);
              }}
              okText="Remove"
            >
              <Button
                className="bg-slate-100 mb-2 md:mb-0 md:mr-2"
                size="small"
                type="danger"
                // onClick={handleRemoveClick}
              >
                Remove
              </Button>
            </Popconfirm>
            <Popconfirm
              title={"Proceed to checkout?"}
              onConfirm={() => {
                proceedStashed(id);
              }}
              cancelText="No"
            >
              {/* <Popconfirm
              title={"Proceed to checkout?"}
              okText="Yes"
              cancelText="No"
            > */}
              <Button className="md:mr-2" size="small" type="primary">
                Proceed
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StashedContainer;
