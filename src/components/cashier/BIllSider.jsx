import { Button, Input, Space, Form } from "antd";
import React, { useState } from "react";
import {
  DollarTwoTone,
  FireFilled,
  FireOutlined,
  PhoneOutlined,
  SafetyCertificateTwoTone,
  SafetyOutlined,
  SearchOutlined,
  SmileOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Bill from "./Bill";
import Payment from "./Payment";
import calculateTotalBill from "../../helpers/getBillSum";
import Icon from "@ant-design/icons/lib/components/Icon";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../selector/languageSel";
import axiosInstance from "../../api/axiosConfig";
import { runes } from "runes2";

const BillSider = ({ value, setValue }) => {
  const { t } = useTranslation(["cashier"]); // Use the translation hook
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [customerData, setCustomerData] = useState({});

  const sum = calculateTotalBill(value);

  const handleCustomerChange = async (e) => {
    const inputValue = e.target.value;
    setCustomer(inputValue);

    // Backend logic or validation
    if (inputValue.length === 10) {
      try {
        // If the phone number is valid, make an API call to get user data
        console.log(customer);
        setValidPhone((validPhone) => true);
        const response = await axiosInstance.get(
          `customers/getCustomerByMobile`,
          {
            params: { mobile: inputValue }, // Send mobile number as query parameter
          }
        );
        console.log(response);
        console.log(validPhone);
        if (response.status === 200) {
          // Do something with the user data, for example, update the state
          setCustomerData(response.data); // Assuming you have a state for storing customer data
          setPhone("success");
          console.log("customer data:", customerData.data);
        } else if (response.data && validPhone) {
          // Handle case when user data is not found
          setPhone("warning");
        } else {
          setPhone("error");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setPhone("error"); // Handle error (e.g., invalid number or API error)
      }
    } else {
      setValidPhone(false);
      setPhone("warning");
    }
  };

  return (
    <div>
      <LanguageSelector />
      <Form layout="vertical">
        <div className="flex items-center mb-4">
          <hr className="flex-grow  mr-1 " />
          <SafetyCertificateTwoTone />
          <h2 className="ml-1 font-semibold">{t("loyalty programme")}</h2>
        </div>

        <Form.Item hasFeedback validateStatus={phone}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ marginRight: 8 }}>{t("Phone")}:</label>
            <Input
              className="w-3/4"
              placeholder={t("phone number")}
              prefix={<PhoneOutlined />}
              value={customer}
              onChange={handleCustomerChange}
              size="medium"
              type="number"
              min={0}
              count={{
                show: true,
                max: 10,
                // strategy: (txt) => runes(txt).length,
                // exceedFormatter: (txt, { max }) =>
                //   runes(txt).slice(0, max).join(""),
              }}
              style={{ backgroundColor: "#fafafa", flexGrow: 1 }} // Adjust the input to fill the remaining space
            />
          </div>
        </Form.Item>
        {/* <hr className="mb-4" /> */}
        <div className="flex items-center mb-4">
          <hr className="flex-grow  mr-1 " />
          <DollarTwoTone />
          <h2 className="ml-1 font-semibold">{t("Discounts")}</h2>
        </div>
        {/* Discount Field */}
        <Form.Item hasFeedback validateStatus="success" className=" ">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <label style={{ marginRight: 8 }}>{t("Promo Code")}:</label>
            <Input
              className="w-3/4"
              placeholder="25%"
              prefix={<FireOutlined />}
              size="medium"
              style={{ backgroundColor: "#fafafa" }} // Adjust the background color to match the design
            />
          </div>
        </Form.Item>
      </Form>

      <div className="mt-5">
        <div
          className="rounded-xl shadow-lg border border-gray-300 p-4"
          style={{
            padding: 24,
            minHeight: 360,
            background: "white",
            // borderRadius: borderRadiusLG,
          }}
        >
          <Bill
            customerData={customerData.data}
            value={value}
            sum={sum}
            setValue={setValue}
          />
        </div>
        {/* {calculateTotalBill(value)} */}
      </div>
      <div className="mt-5">
        <div
          className="rounded-xl shadow-lg border border-gray-300 p-4"
          style={{
            //padding: 24,
            minHeight: 360,
            background: "white",
            // borderRadius: borderRadiusLG,
          }}
        >
          <Payment customerData={customerData.data} sum={sum} value={value} />
        </div>
      </div>
    </div>
  );
};

export default BillSider;
