// import React, { useState } from "react";
// import {
//   Button,
//   Input,
//   Space,
//   Typography,
//   Row,
//   Col,
//   Divider,
//   notification,
// } from "antd";
// import { DollarOutlined, CreditCardOutlined } from "@ant-design/icons";
// import PopUp from "./PopUpModel";
// import axiosInstance_sales from "../../api/axiosConfig_Sales";
// import { useUserData } from "../../context/userContext";
// import Notification from "./Notification";
// import Stash from "./StashBill";

// const { Title, Text } = Typography;

// const Payment = ({ sum, value }) => {
//   const [amountReceived, setAmountReceived] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [billState, setBillState] = useState("pending");

//   const handleInputChange = (e) => {
//     setAmountReceived(e.target.value);
//   };

//   //getting the userdata of the cashier currently working
//   const userData = useUserData();
//   console.log(userData);

//   const calculateBalance = () => {
//     const received = Number(amountReceived);
//     return received > sum ? (received - sum).toFixed(2) : 0;
//   };

//   const handleCheckout = async () => {
//     const data = {
//       discount: 10,
//       cashier_id: userData.fullUser.employee_id,
//       store_id: 1,
//       customer_id: 1,
//       items: { value }, // Replace with actual items data
//       paymentmethod: paymentMethod,
//     };

//     try {
//       const response = await axiosInstance_sales.post("/newOrder", data);
//       // console.log("API request made. Response:", response);

//       // Log the status code directly
//       // console.log("Status code:", response.status);
//       // console.log("Checkout successful:", response.data);
//       if (response.status === 201) {
//         console.log("Checkout successful:", response.data, response.status);
//         // Refresh the page after successful checkout
//         // Wait 8 seconds before reloading
//         setTimeout(() => {
//           window.location.reload();
//         }, 5000);
//         // Show success notification
//         notification.success({
//           message: "Checkout Successful",
//           description: "The payment has been processed successfully.",
//           icon: <DollarOutlined style={{ color: "#108ee9" }} />,
//           placement: "topRight",
//           style: {
//             backgroundColor: "#cefad0", // Red background color
//             //color: "#fff", // White text color for better contrast
//           },
//         });

//         // Reload the page after a few seconds
//         // setTimeout(() => {
//         //   window.location.reload();
//         // }, 3000); // 3 seconds delay before reload
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };
//   const handleStash = async () => {
//     const data = {
//       discount: 10,
//       cashier_id: userData.fullUser.employee_id,
//       store_id: 1,
//       customer_id: 1,
//       items: { value }, // Replace with actual items data
//       paymentmethod: paymentMethod,
//       status: "stashed",
//     };

//     try {
//       const response = await axiosInstance_sales.post("/newOrder", data);
//       // console.log("API request made. Response:", response);

//       // Log the status code directly
//       // console.log("Status code:", response.status);
//       // console.log("Checkout successful:", response.data);
//       if (response.status === 201) {
//         console.log("Checkout successful:", response.data, response.status);
//         setTimeout(() => {
//           window.location.reload();
//         }, 5000);

//         // Show success notification
//         notification.success({
//           message: "Checkout Successful",
//           description: "The payment has been processed successfully.",
//           icon: <DollarOutlined style={{ color: "#108ee9" }} />,
//           placement: "topRight",
//           style: {
//             backgroundColor: "#cefad0", // Red background color
//             //color: "#fff", // White text color for better contrast
//           },
//         });

//         // Reload the page after a few seconds
//         // setTimeout(() => {
//         //   window.location.reload();
//         // }, 3000); // 3 seconds delay before reload
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         background: "#fff",
//         borderRadius: "8px",
//         // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
//         Payment
//       </Title>

//       <Row gutter={[16, 16]} justify="center">
//         <Col>
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: paymentMethod === "cash" ? "#1890ff" : "#ffffff", // Inverted background
//               color: paymentMethod === "cash" ? "#ffffff" : "#1890ff", // Inverted text color
//               borderColor: paymentMethod === "cash" ? "#1890ff" : "#1890ff", // Border color
//             }}
//             onClick={() => {
//               setPaymentMethod("cash");
//             }}
//             icon={<DollarOutlined />}
//             size="large"
//           >
//             Cash
//           </Button>
//         </Col>
//         <Col>
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: paymentMethod === "card" ? "#1890ff" : "#ffffff", // Inverted background
//               color: paymentMethod === "card" ? "#ffffff" : "#1890ff", // Inverted text color
//               borderColor: paymentMethod === "card" ? "#1890ff" : "#1890ff", // Border color
//             }}
//             onClick={() => {
//               setPaymentMethod("card");
//             }}
//             icon={<CreditCardOutlined />}
//             size="large"
//           >
//             Card
//           </Button>
//         </Col>
//       </Row>

//       <Divider />
//       <Row justify="space-between" style={{ marginTop: "24px" }}>
//         <Col>
//           <Text strong>Total:</Text>
//         </Col>
//         <Col>
//           <Title level={4}>{sum.toFixed(2)}</Title>
//         </Col>
//       </Row>
//       <Row justify="space-between" style={{ marginTop: "24px" }}>
//         <Col>
//           <Text strong>Amount Received:</Text>
//         </Col>
//         <Col>
//           <Space size="large">
//             <Input
//               placeholder="Enter Amount"
//               value={amountReceived}
//               onChange={handleInputChange}
//               size="large"
//               style={{ width: "100px" }}
//             />
//           </Space>
//         </Col>
//       </Row>

//       <Row justify="space-between" style={{ marginTop: "24px" }}>
//         <Col>
//           <Text strong>Balance:</Text>
//         </Col>
//         <Col>
//           <Title level={4}>{calculateBalance()}</Title>
//         </Col>
//       </Row>

//       <Divider />

//       {/* <PopUp popup asking cash or card? /> */}
//       <div className="flex justify-center" style={{ marginTop: "24px" }}>
//         <Button
//           type="primary"
//           size="large"
//           onClick={handleCheckout}
//           style={{ margin: 8 }}
//         >
//           checkout
//         </Button>
//         <div className="m-[8px]">
//           <Stash func={handleStash} />
//         </div>
//       </div>
//     </div>
//   );
// };

//neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew
// export default Payment;
// import React, { useState } from "react";
// import {
//   Button,
//   Input,
//   Space,
//   Typography,
//   Row,
//   Col,
//   Divider,
//   notification,
// } from "antd";
// import {
//   DollarOutlined,
//   CreditCardOutlined,
//   FileOutlined,
// } from "@ant-design/icons";
// import axiosInstance_sales from "../../api/axiosConfig_Sales";
// import { useUserData } from "../../context/userContext";
// import Stash from "./StashBill";

// const { Title, Text } = Typography;

// const Payment = ({ sum, value, discount, orderTax, itemCount }) => {
//   const [amountReceived, setAmountReceived] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [cash, setCash] = useState(100);

//   // Get user data
//   const userData = useUserData();

//   // Handle amount input change
//   const handleInputChange = (e) => {
//     // setAmountReceived(e.target.value);
//     setCash(e.target.value);
//   };

//   // Calculate the balance
//   const calculateBalance = () => {
//     const received = Number(amountReceived);
//     return received > sum ? (received - sum).toFixed(2) : 0;
//   };

//   // Handle checkout
//   const handleCheckout = async () => {
//     const data = {
//       discount,
//       cashier_id: userData.fullUser.employee_id,
//       store_id: 1,
//       customer_id: 1,
//       items: value,
//       paymentmethod: paymentMethod,
//     };

//     try {
//       const response = await axiosInstance_sales.post("/newOrder", data);
//       if (response.status === 201) {
//         notification.success({
//           message: "Checkout Successful",
//           description: "The payment has been processed successfully.",
//           icon: <DollarOutlined style={{ color: "#108ee9" }} />,
//         });
//         setTimeout(() => window.location.reload(), 5000);
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         background: "#f4f6ff",
//         borderRadius: "12px",
//         maxWidth: "400px",
//         margin: "auto",
//       }}
//     >
//       <Row gutter={[16, 16]}>
//         <Col span={12}>
//           <Text>Items:</Text>
//         </Col>
//         <Col span={12}>
//           <Text>{itemCount}</Text>
//         </Col>
//         <Col span={12}>
//           <Text strong>Total Price:</Text>
//         </Col>
//         <Col span={12}>
//           <Text strong style={{ fontSize: "18px" }}>
//             {`$ ${sum.toFixed(2)}`}
//             {/* {`$ ${(sum + orderTax - (sum * discount) / 100).toFixed(2)}`} */}
//           </Text>
//         </Col>

//         <Col span={12}>
//           <Text>Cash:</Text>
//         </Col>
//         <Col span={12}>
//           <Input
//             placeholder="Enter Amount"
//             value={amountReceived}
//             onChange={handleInputChange}
//             size="large"
//             style={{ width: "100px" }}
//           />
//           {/* <Input value={`$ ${sum.toFixed(2)}`} style={{ textAlign: "right" }} /> */}
//         </Col>

//         <Col span={12}>
//           <Text>Change:</Text>
//         </Col>
//         <Col span={12}>
//           <Text style={{ fontSize: "18px" }}>
//             {`$ ${sum.toFixed(2)}`}
//             {/* {`$ ${(sum + orderTax - (sum * discount) / 100).toFixed(2)}`} */}
//           </Text>
//         </Col>
//       </Row>

//       <Divider />

//       {/* Action buttons */}
//       <Row gutter={[16, 16]} justify="center" style={{ marginTop: "24px" }}>
//         <Col>
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#00bcd4",
//               borderColor: "#00bcd4",
//               color: "#fff",
//               width: "100px",
//             }}
//             icon={<FileOutlined />}
//             size="large"
//           >
//             Draft
//           </Button>
//         </Col>
//         <Col>
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#e0e0e0",
//               borderColor: "#e0e0e0",
//               color: "#000",
//               width: "100px",
//             }}
//             icon={<CreditCardOutlined />}
//             size="large"
//           >
//             Card
//           </Button>
//         </Col>
//         <Col>
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#8e44ad",
//               borderColor: "#8e44ad",
//               color: "#fff",
//               width: "100px",
//             }}
//             icon={<DollarOutlined />}
//             size="large"
//           >
//             Cash
//           </Button>
//         </Col>
//         <Col>
//           <Button
//             type="primary"
//             style={{
//               backgroundColor: "#000",
//               borderColor: "#000",
//               color: "#fff",
//               width: "100px",
//             }}
//             size="large"
//           >
//             Cancel
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Payment;
import React, { useState } from "react";
import {
  Button,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  notification,
  Modal,
} from "antd";
import {
  DollarOutlined,
  CreditCardOutlined,
  FileOutlined,
  LoadingOutlined,
  ShoppingTwoTone,
} from "@ant-design/icons";
import axiosInstance_sales from "../../api/axiosConfig_Sales";
import { useUserData } from "../../context/userContext";
import Stash from "./StashBill";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/axiosConfig";

const { Title, Text } = Typography;

const Payment = ({
  sum,
  value,
  discount,
  orderTax,
  itemCount,
  customerData,
}) => {
  const { t } = useTranslation(["cashier"]); // Use the translation hook
  const [amountReceived, setAmountReceived] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cash, setCash] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [StashModalOpen, setStashModalOpen] = useState(false);

  // Get user data
  const userData = useUserData();

  // Handle amount input change
  const handleInputChange = (e) => {
    setAmountReceived(e.target.value);
    setCash(e.target.value);
  };

  // Calculate the balance
  const calculateBalance = () => {
    const received = Number(amountReceived);
    return received > sum ? (received - sum).toFixed(2) : 0;
  };
  const store_id = 1;

  // Handle checkout
  const handleCheckout = async () => {
    const data = {
      discount,
      cashier_id: userData.fullUser.employee_id,
      store_id: 1,
      mobile: "0568549048",
      items: value,
      paymentmethod: paymentMethod,
    };

    try {
      const response = await axiosInstance_sales.post("/newOrder", data);
      if (response.status === 201) {
        notification.success({
          message: "Checkout Successful",
          description: "The payment has been processed successfully.",
          icon: <DollarOutlined style={{ color: "#108ee9" }} />,
        });
        setIsModalOpen("true");
        console.log(data);
        if (customerData && Object.keys(customerData).length > 0) {
          const billResponse = await axiosInstance.post("/customers/sendBill", {
            customerData,
            data,
          });
        }

        setTimeout(() => window.location.reload(), 5000);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  const handleStash = async () => {
    const data = {
      discount: 10,
      cashier_id: userData.fullUser.employee_id,
      store_id: store_id,
      mobile: userData.mobile,
      // mobile: "0568549048",
      items: value, // Replace with actual items data
      paymentmethod: paymentMethod,
      status: "stashed",
    };

    try {
      const response = await axiosInstance_sales.post("/newOrder", data);
      // console.log("API request made. Response:", response);

      // Log the status code directly
      // console.log("Status code:", response.status);
      // console.log("Checkout successful:", response.data);
      if (response.status === 201) {
        console.log("Checkout successful:", response.data, response.status);
        setStashModalOpen("true");
        setTimeout(() => {
          window.location.reload();
        }, 5000);

        // Show success notification
        notification.success({
          message: "Checkout Successful",
          description: "The payment has been processed successfully.",
          icon: <DollarOutlined style={{ color: "#108ee9" }} />,
          placement: "topRight",
          style: {
            backgroundColor: "#cefad0", // Red background color
            //color: "#fff", // White text color for better contrast
          },
        });

        // Reload the page after a few seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000); // 3 seconds delay before reload
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  console.log(userData);
  return (
    <>
      <div
        style={{
          padding: "20px",
          background: "#f4f6ff",
          borderRadius: "12px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <Row gutter={[16, 16]} justify="center" className="mt-5">
          <Col>
            <Button
              type="primary"
              style={{
                backgroundColor:
                  paymentMethod === "cash" ? "#1890ff" : "#ffffff",
                color: paymentMethod === "cash" ? "#ffffff" : "#1890ff",
                borderColor: paymentMethod === "cash" ? "#1890ff" : "#1890ff",
              }}
              onClick={() => {
                setPaymentMethod("cash");
              }}
              icon={<DollarOutlined />}
              size="large"
            >
              {t("payment.cash")}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              style={{
                backgroundColor:
                  paymentMethod === "card" ? "#1890ff" : "#ffffff",
                color: paymentMethod === "card" ? "#ffffff" : "#1890ff",
                borderColor: paymentMethod === "card" ? "#1890ff" : "#1890ff",
              }}
              onClick={() => {
                setPaymentMethod("card");
              }}
              icon={<CreditCardOutlined />}
              size="large"
            >
              {t("payment.card")}
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="mt-5">
          <Col span={12}>
            <Text>{t("payment.items")}</Text>
          </Col>
          <Col span={12} className="grid justify-items-end">
            <Text>{itemCount}</Text>
          </Col>
          <Col span={12}>
            <Text strong>{t("payment.total_price")}</Text>
          </Col>
          <Col span={12} className="grid justify-items-end">
            <Text strong style={{ fontSize: "18px" }}>
              {`$ ${sum.toFixed(2)}`}
            </Text>
          </Col>
          <Col span={12}>
            <Text>{t("payment.amount_received")}:</Text>
          </Col>
          <Col span={12} className="grid justify-items-end">
            <Input
              className="w-full"
              placeholder={t("payment.cash_placeholder")}
              value={amountReceived}
              onChange={handleInputChange}
              size="large"
              readOnly={paymentMethod === "card"}
              type="number"
              min={0}
            />
          </Col>
          <Col span={12}>
            <Text>{t("payment.change")}:</Text>
          </Col>
          <Col span={12} className="grid justify-items-end">
            <Text style={{ fontSize: "18px" }}>{calculateBalance()}</Text>
          </Col>
        </Row>
        <Divider />
        {/* Action buttons */}
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "24px" }}>
          <Col>
            <div>
              <Stash func={handleStash} />
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              style={{
                backgroundColor: "#000",
                borderColor: "#000",
                color: "#fff",
                width: "100px",
              }}
              size="large"
              onClick={handleCheckout}
            >
              {t("payment.checkout")}
            </Button>
          </Col>
        </Row>
      </div>

      {/* Modal for Checkout */}
      <Modal
        title={null}
        open={isModalOpen}
        footer={null}
        closable={false}
        centered
      >
        <div className="flex flex-col items-center">
          <ShoppingTwoTone
            style={{
              fontSize: "24px",
              color: "#1890ff",
              marginBottom: "8px",
            }}
          />{" "}
          <p className="text-lg font-semibold">
            {t("payment.processing_order")}
          </p>
          <img
            src={"/shopping-cart.gif"}
            alt={t("payment.loading_animation")}
            width="150px"
            className="mb-4"
          />
          <p className="text-lg font-semibold">
            {t("payment.processing_order")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t("payment.please_wait")}
          </p>
          <LoadingOutlined
            style={{ fontSize: "24px", color: "#1890ff", marginTop: "8px" }}
            spin
          />
        </div>
      </Modal>

      {/* Modal for Stashing */}
      <Modal
        title={null}
        open={StashModalOpen}
        footer={null}
        closable={false}
        centered
      >
        <div className="flex flex-col items-center">
          <ShoppingTwoTone
            style={{
              fontSize: "24px",
              color: "#1890ff",
              marginBottom: "8px",
            }}
          />{" "}
          <p className="text-lg font-semibold">{t("payment.stashing_bill")}</p>
          <img
            src={"/warehouse.gif"}
            alt={t("payment.loading_animation")}
            width="150px"
            className="mb-4"
          />
          <p className="text-lg font-semibold">
            {t("payment.processing_order")}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t("payment.please_wait")}
          </p>
          <LoadingOutlined
            style={{ fontSize: "24px", color: "#1890ff", marginTop: "8px" }}
            spin
          />
        </div>
      </Modal>
    </>
  );
};

export default Payment;
