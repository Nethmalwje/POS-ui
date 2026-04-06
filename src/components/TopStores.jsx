import React from "react";
import { Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const cardData = [
  { title: "Gampaha", sales: 52300, stocks: 1200, trend: "up" },
  { title: "Moratuwa", sales: 86030, stocks: 800, trend: "down" },
  { title: "Mirigama", sales: 1235000, stocks: 6540, trend: "down" },
  { title: "Piliyandala", sales: 225000, stocks: 675, trend: "up" },
];

const TopStores = (filter) => {
  return (
    <div className=" pt-5">
      <div className=" flex justify-between items-center">
        <h2 className="text-lg font-poppins font-semibold">Top Stores</h2>
      </div>
      <div className="flex gap-5 justify-center">
        {" "}
        {/*add a 'gap-5' here */}
        {cardData.map((card, index) => {
          return (
            <Card
              key={index}
              className={`border-primary-400 rounded-lg mt-5 lg:w-1/4 md:w-1/3 sm:w-1/2`}
              title={card.title}
            >
              <div className=" flex justify-between">
                <Statistic title="Total: " prefix="Rs." value={card.sales} />
                <Statistic
                  title="No. of Stocks:"
                  value={card.stocks}
                  valueStyle={{
                    color: card.trend === "up" ? "#3f8600" : "#cf1322",
                  }}
                  suffix={
                    card.trend === "up" ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )
                  }
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopStores;

//   suffix={
//     card.trend === "up" ? (
//       <ArrowUpOutlined />
//     ) : (
//       <ArrowDownOutlined />
//     )
//   }
