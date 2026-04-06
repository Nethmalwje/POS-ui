// import React, { useState } from "react";
// import SearchItem from "../../components/cashier/SearchItem";
// import AddSale from "../../components/cashier/AddSale";
// import { Layout, theme } from "antd";
// import BillSider from "../../components/cashier/BIllSider";
// import ShowStashedBills from "../../components/cashier/ShowStashedBills";

// const { Content, Sider } = Layout;

// const Cashier = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const [bill, setBill] = useState([]);

//   return (
//     <>
//       {/* <Content
//         className="w-full"
//         style={{
//           flex: 1,

//           padding: "24px",
//           overflowY: "auto",
//         }}
//       >
//         <div
//           className="p-6 min-h-[360px] "
//           style={{
//             background: `linear-gradient(150deg, #ffffff, #ffffff)`,
//             borderRadius: borderRadiusLG,
//           }}
//         > */}
//       <Layout style={{ minHeight: "100vh " }} className="w-full">
//         <div
//           className="p-6 min-h-[360px] "
//           style={{
//             background: `linear-gradient(150deg, #ffffff, #ffffff)`,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Content
//             style={{
//               margin: "0",
//               padding: 1,
//               minHeight: 360,
//               background: "white",
//               borderRadius: 1,
//             }}
//           >
//             <div>
//               <AddSale setVariable={setBill} />
//             </div>
//             <div>
//               <div className="text-2xl my-4">Find Item</div>
//               <div className="mr-5">
//                 <SearchItem setVariable={setBill} />
//               </div>
//             </div>
//             {console.log({ bill })}
//           </Content>
//         </div>
//         <div
//           className="p-6 min-h-[360px] ml-4 "
//           style={{
//             background: `linear-gradient(150deg, #ffffff, #ffffff)`,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Sider
//             width={400}
//             style={{
//               background: "white",
//               // marginLeft: "1px",
//             }}
//           >
//             <div
//               style={{
//                 // paddingLeft: "15px",
//                 minHeight: 360,
//                 background: "white",
//                 borderRadius: 1,
//               }}
//             >
//               <BillSider value={bill} setValue={setBill} />
//             </div>
//           </Sider>
//         </div>
//       </Layout>
//       {/* </div>
//       </Content> */}
//       {/* <Content>
//         <ShowStashedBills />
//       </Content> */}
//     </>
//   );
// };

// export default Cashier;

import React, { useState } from "react";
import SearchItem from "../../components/cashier/SearchItem";
import AddSale from "../../components/cashier/AddSale";
import { Layout, theme } from "antd";
import BillSider from "../../components/cashier/BIllSider";
import ShowStashedBills from "../../components/cashier/ShowStashedBills";
//import { t } from "i18next";
import { useTranslation } from "react-i18next";

const { Content, Sider } = Layout;

const Cashier = () => {
  const { t } = useTranslation(["cashier"]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [bill, setBill] = useState([]);

  return (
    <>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#e0e0e0" }}>
        <Content
          style={{
            margin: "0",
            //padding: 1,
            minHeight: 360,
            background: "white",
            borderRadius: borderRadiusLG,
          }}
        >
          <div
            className="p-6 min-h-[360px] ml-1"
            style={{
              background: `linear-gradient(150deg, #ffffff, #ffffff)`,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>
              <AddSale setVariable={setBill} />
            </div>
            <div>
              <div className="text-2xl my-4 font-semibold">
                {t("Find Item")}
              </div>
              <div className="">
                <SearchItem setVariable={setBill} />
              </div>
            </div>
            {console.log({ bill })}
          </div>
        </Content>

        <Sider
          width={500}
          style={{
            background: "white",
            marginLeft: "16px",
            borderRadius: borderRadiusLG,
          }}
        >
          <div
            className="p-6 min-h-[360px]  "
            style={{
              background: `linear-gradient(150deg, #ffffff, #ffffff)`,
              borderRadius: borderRadiusLG,
            }}
          >
            <div
              style={{
                // paddingLeft: "15px",
                minHeight: 360,
                background: "white",
                borderRadius: 1,
              }}
            >
              <BillSider value={bill} setValue={setBill} />
            </div>
          </div>
        </Sider>
      </Layout>
      {/* <Content>
        <ShowStashedBills />
      </Content> */}
    </>
  );
};

export default Cashier;
