// // import { useEffect, useState } from "react";
// // import { Button, theme } from "antd";
// // import { DisconnectOutlined } from "@ant-design/icons";
// // import StashedContainer from "./StashedContainer";
// // import { useTranslation } from "react-i18next";
// // import LanguageSelector from "../selector/languageSel";
// // import axiosInstance_sales from "../../api/axiosConfig_Sales";

// // function Stashed() {
// //   //   const stashedBills = [
// //   //     {
// //   //       id: 234783,
// //   //       customer: "nirmal220",
// //   //       total: "254.00",
// //   //       timestamp: "16:57:23 9/21/2024",
// //   //     },
// //   //     {
// //   //       id: 234784,
// //   //       customer: "john_doe",
// //   //       total: "150.75",
// //   //       timestamp: "10:15:30 9/22/2024",
// //   //     },
// //   //     {
// //   //       id: 234785,
// //   //       customer: "jane_smith",
// //   //       total: "320.50",
// //   //       timestamp: "11:45:00 9/23/2024",
// //   //     },
// //   //     {
// //   //       id: 234786,
// //   //       customer: "alice_wonder",
// //   //       total: "89.99",
// //   //       timestamp: "14:30:00 9/24/2024",
// //   //     },
// //   //     {
// //   //       id: 234787,
// //   //       customer: "bob_builder",
// //   //       total: "412.00",
// //   //       timestamp: "09:00:00 9/25/2024",
// //   //     },
// //   //   ];
// //   const { t, i18n } = useTranslation();

// //   const [stashedBills, setStashedBills] = useState([
// //     {
// //       id: 234783,
// //       customer: "nirmal220",
// //       total: "254.00",
// //       timestamp: "16:57:23 9/21/2024",
// //     },
// //     {
// //       id: 234784,
// //       customer: "john_doe",
// //       total: "150.75",
// //       timestamp: "10:15:30 9/22/2024",
// //     },
// //     {
// //       id: 234785,
// //       customer: "jane_smith",
// //       total: "320.50",
// //       timestamp: "11:45:00 9/23/2024",
// //     },
// //     {
// //       id: 234786,
// //       customer: "alice_wonder",
// //       total: "89.99",
// //       timestamp: "14:30:00 9/24/2024",
// //     },
// //     {
// //       id: 234787,
// //       customer: "bob_builder",
// //       total: "412.00",
// //       timestamp: "09:00:00 9/25/2024",
// //     },
// //   ]);
// //   const [searchId, setSearchId] = useState("");
// //   const [searchCustomer, setSearchCustomer] = useState("");
// //   const [bills, setBills] = useState([]);

// //   const filteredBills = stashedBills.filter((bill) => {
// //     const idMached = String(bill.id).includes(searchId);
// //     const customerMatched = bill.customer
// //       .toLowerCase()
// //       .includes(searchCustomer.toLowerCase());
// //     return idMached && customerMatched;
// //   });

// //   const handleReset = () => {
// //     setSearchId("");
// //     setSearchCustomer("");
// //   };

// //   const handleRemove = async (key) => {
// //     console.log("Removing stashed bill: ", key);
// //     const data = {
// //       bill_id: key,
// //       status: "cancelled",
// //     };
// //     try {
// //       const response = await axiosInstance_sales.post("/status", data);

// //       console.log("response from bill", response);
// //       setBills(response.data);

// //       //setBills(response.data); // Adjust according to your API response structure
// //     } catch (error) {
// //       console.error("Error during data fetch from sales service:", error);
// //     }

// //     //setStashedBills((bills) => bills.filter((bill) => bill.id !== key));
// //   };
// //   const {
// //     token: { colorBgContainer, borderRadiusLG },
// //   } = theme.useToken();

// //   // Fetch bills data from the API
// //   const handleLoad = async () => {
// //     try {
// //       const response = await axiosInstance_sales.get("/getOrder");

// //       console.log("response from bill", response);
// //       setBills(response.data);

// //       //setBills(response.data); // Adjust according to your API response structure
// //     } catch (error) {
// //       console.error("Error during data fetch from sales service:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     handleLoad();
// //   }, []);

// //   console.log("console after use effcet:", bills);
// //   // Filter only the bills with status "Pending"
// //   const pendingBills = bills.filter((bill) => bill.status === "Pending");
// //   //stashedBills(pendingBills);
// //   //console.log("this is stashed bills:", stashedBills);
// //   console.log(pendingBills);

// //   return (
// //     <>
// //       <div
// //         className="p-6 min-h-[360px] ml-1"
// //         style={{
// //           background: `linear-gradient(150deg, #ffffff, #ffffff)`,
// //           minHeight: "100vh",
// //           borderRadius: borderRadiusLG,
// //         }}
// //       >
// //         <h1>{t("Welcome to React")}</h1>
// //         <LanguageSelector />
// //         <div className="mb-4 flex justify-between items-center">
// //           <div className=" font-bold text-xl mb-4 mr-4">Stashed Bills</div>
// //           <div className="">
// //             <input
// //               type="text"
// //               placeholder="Search by Bill ID"
// //               value={searchId}
// //               onChange={(e) => setSearchId(e.target.value)}
// //               className="border rounded p-2 mr-2"
// //             />
// //             <input
// //               type="text"
// //               placeholder="Search by Customer"
// //               value={searchCustomer}
// //               onChange={(e) => setSearchCustomer(e.target.value)}
// //               className="border rounded p-2 mr-2"
// //             />
// //             <Button
// //               className=" p-2"
// //               onClick={() => {
// //                 handleReset();
// //               }}
// //             >
// //               Reset
// //             </Button>
// //           </div>
// //         </div>
// //         <div className="grid grid-cols-1 pt-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //           {filteredBills.length === 0 ? (
// //             <div className="flex text-gray-400 content-center justify-center">
// //               <DisconnectOutlined className="mx-2" />
// //               <div className="mx-2">No Stashed bills found.</div>
// //             </div>
// //           ) : (
// //             pendingBills.map((bill) => (
// //               <StashedContainer
// //                 id={bill.bill_id}
// //                 customer={bill.customer}
// //                 total={bill.total}
// //                 timestamp={bill.timestamp}
// //                 removeStashed={handleRemove(bill.bill_id)}
// //                 // {/* filteredBills.map((bill) => (
// //                 //   <StashedContainer
// //                 //     id={bill.id}
// //                 //     customer={bill.customer}
// //                 //     total={bill.total}
// //                 //     timestamp={bill.timestamp}
// //                 //     removeStashed={handleRemove} */}
// //               />
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default Stashed;
// import { useEffect, useState } from "react";
// import { Button, theme } from "antd";
// import { DisconnectOutlined } from "@ant-design/icons";
// import StashedContainer from "./StashedContainer";
// import { useTranslation } from "react-i18next";
// import LanguageSelector from "../selector/languageSel";
// import axiosInstance_sales from "../../api/axiosConfig_Sales";

// function Stashed() {
//   const { t } = useTranslation();

//   const [stashedBills, setStashedBills] = useState([
//     {
//       id: 234783,
//       customer: "nirmal220",
//       total: "254.00",
//       timestamp: "16:57:23 9/21/2024",
//     },
//     {
//       id: 234784,
//       customer: "john_doe",
//       total: "150.75",
//       timestamp: "10:15:30 9/22/2024",
//     },
//     {
//       id: 234785,
//       customer: "jane_smith",
//       total: "320.50",
//       timestamp: "11:45:00 9/23/2024",
//     },
//     {
//       id: 234786,
//       customer: "alice_wonder",
//       total: "89.99",
//       timestamp: "14:30:00 9/24/2024",
//     },
//     {
//       id: 234787,
//       customer: "bob_builder",
//       total: "412.00",
//       timestamp: "09:00:00 9/25/2024",
//     },
//   ]);
//   const [searchId, setSearchId] = useState("");
//   const [searchCustomer, setSearchCustomer] = useState("");
//   const [bills, setBills] = useState([]);
//   const [pendingBills, setPendingBills] = useState([]);

//   const filteredBills = stashedBills.filter((bill) => {
//     const idMatched = String(bill.id).includes(searchId);
//     const customerMatched = bill.customer
//       .toLowerCase()
//       .includes(searchCustomer.toLowerCase());
//     return idMatched && customerMatched;
//   });

//   const handleReset = () => {
//     setSearchId("");
//     setSearchCustomer("");
//   };

//   const handleRemove = async (key) => {
//     console.log("Removing stashed bill: ", key);
//     const data = {
//       bill_id: key,
//       status: "cancelled",
//     };
//     try {
//       const response = await axiosInstance_sales.post("/status", data);
//       console.log("response from bill", response);
//       // setBills(response.data);
//     } catch (error) {
//       console.error("Error during data fetch from sales service:", error);
//     }
//   };

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   //Fetch bills data from the API
//   const handleLoad = async () => {
//     try {
//       const response = await axiosInstance_sales.get("/getOrder");

//       console.log("response from bill", response);

//       setBills(response.data); // Assuming response.data is an array
//       console.log("bills:", bills);
//       // Filter only the bills with status "Pending"
//       const filteredBills = bills.filter((bill) => bill.status === "Pending");
//       setPendingBills(filteredBills);
//       console.log("filtered Billjjs:", filteredBills);
//     } catch (error) {
//       console.error("Error during data fetch from sales service:", error);
//     }
//   };
//   //console.log(bills);

//   useEffect(() => {
//     handleLoad();
//   }, []);

//   return (
//     <>
//       <div
//         className="p-6 min-h-[360px] ml-1"
//         style={{
//           background: `linear-gradient(150deg, #ffffff, #ffffff)`,
//           minHeight: "100vh",
//           borderRadius: borderRadiusLG,
//         }}
//       >
//         <h1>{t("Welcome to React")}</h1>
//         <LanguageSelector />
//         <div className="mb-4 flex justify-between items-center">
//           <div className=" font-bold text-xl mb-4 mr-4">Stashed Bills</div>
//           <div className="">
//             <input
//               type="text"
//               placeholder="Search by Bill ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               className="border rounded p-2 mr-2"
//             />
//             <input
//               type="text"
//               placeholder="Search by Customer"
//               value={searchCustomer}
//               onChange={(e) => setSearchCustomer(e.target.value)}
//               className="border rounded p-2 mr-2"
//             />
//             <Button
//               className=" p-2"
//               onClick={() => {
//                 handleReset();
//               }}
//             >
//               Reset
//             </Button>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 pt-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {filteredBills.length === 0 ? (
//             <div className="flex text-gray-400 content-center justify-center">
//               <DisconnectOutlined className="mx-2" />
//               <div className="mx-2">No Stashed bills found.</div>
//             </div>
//           ) : (
//             pendingBills.map((bill) => (
//               <StashedContainer
//                 key={bill.bill_id}
//                 id={bill.bill_id}
//                 customer={bill.customer}
//                 total={bill.total}
//                 timestamp={bill.timestamp}
//                 removeStashed={() => handleRemove(bill.bill_id)} // Fix: Use arrow function
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Button, theme } from "antd";
import { DisconnectOutlined } from "@ant-design/icons";
import StashedContainer from "./StashedContainer";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../selector/languageSel";
import axiosInstance_sales from "../../api/axiosConfig_Sales";
import { useNavigate } from "react-router-dom";

function Stashed() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [stashedBills, setStashedBills] = useState([
    {
      id: 234783,
      customer: "nirmal220",
      total: "254.00",
      timestamp: "16:57:23 9/21/2024",
    },
    {
      id: 234784,
      customer: "john_doe",
      total: "150.75",
      timestamp: "10:15:30 9/22/2024",
    },
    {
      id: 234785,
      customer: "jane_smith",
      total: "320.50",
      timestamp: "11:45:00 9/23/2024",
    },
    {
      id: 234786,
      customer: "alice_wonder",
      total: "89.99",
      timestamp: "14:30:00 9/24/2024",
    },
    {
      id: 234787,
      customer: "bob_builder",
      total: "412.00",
      timestamp: "09:00:00 9/25/2024",
    },
  ]);

  const [searchId, setSearchId] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [bills, setBills] = useState([]);
  const [pendingBills, setPendingBills] = useState([]);

  const filteredBills = stashedBills.filter((bill) => {
    const idMatched = String(bill.id).includes(searchId);
    const customerMatched = bill.customer
      .toLowerCase()
      .includes(searchCustomer.toLowerCase());
    return idMatched && customerMatched;
  });

  const handleReset = () => {
    setSearchId("");
    setSearchCustomer("");
  };

  const handleRemove = async (key) => {
    console.log("Removing stashed bill: ", key);
    const data = {
      bill_id: key,
      status: "cancelled",
    };
    try {
      const response = await axiosInstance_sales.post("/status", data);
      console.log("response from bill", response);
    } catch (error) {
      console.error("Error during data fetch from sales service:", error);
    }
  };
  const handleProceed = ({ bill_id, items }) => {
    handleRemove(bill_id);
    navigate("/dashboard", { state: { stashedBill: { bill_id, items } } });
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fetch bills data from the API
  const handleLoad = async () => {
    try {
      const response = await axiosInstance_sales.get("/getOrder");

      //console.log("response from bill", response);
      setBills(response.data); // Set the fetched bills

      // Filter only the bills with status "Pending" immediately after setting bills
      const filteredBills = response.data.filter(
        (bill) => bill.status === "Pending"
      );
      setPendingBills(filteredBills);
      // console.log("Pending bills:", filteredBills);
    } catch (error) {
      console.error("Error during data fetch from sales service:", error);
    }
  };
  console.log("bills:", bills);

  useEffect(() => {
    handleLoad(); // Load bills data on component mount
  }, []);

  return (
    <>
      <div
        className="p-6 min-h-[360px] ml-1"
        style={{
          background: `linear-gradient(150deg, #ffffff, #ffffff)`,
          minHeight: "100vh",
          borderRadius: borderRadiusLG,
        }}
      >
        <div className="mb-4 flex justify-between items-center">
          <div className="font-bold text-xl mb-4 mr-4">Stashed Bills</div>
          <div>
            <input
              type="text"
              placeholder="Search by Bill ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="border rounded p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Search by Customer"
              value={searchCustomer}
              onChange={(e) => setSearchCustomer(e.target.value)}
              className="border rounded p-2 mr-2"
            />
            <Button
              className="p-2"
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className="pt-4">
          {pendingBills.length === 0 ? (
            <div className="flex text-gray-400 items-center justify-center">
              <DisconnectOutlined className="mx-2" />
              <div className="mx-2">No stashed bills found.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {pendingBills.map((bill) => (
                <StashedContainer
                  key={bill.bill_id}
                  id={bill.bill_id}
                  customer={bill.customer}
                  total={bill.total}
                  timestamp={bill.timestamp}
                  removeStashed={() => handleRemove(bill.bill_id)} // Use arrow function to pass the correct key
                  proceedStashed={() =>
                    handleProceed({ bill_id: bill.bill_id, items: bill.items })
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Stashed;
