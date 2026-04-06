import React from "react";
import { Card, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const cardData = [
  { title: "Salted Butter", quantity: 12350, growth: 0.23, trend: "down" },
  { title: "Low Fat Milk", quantity: 2250, growth: 1.15, trend: "up" },
  { title: "Basmati Rice", quantity: 860, growth: 4.25, trend: "down" },
  { title: "Cheddar Cheese", quantity: 523, growth: 12.18, trend: "up" },
];

const TopSelling = (filter) => {
  return (
    <div className=" pt-5">
      <div className=" flex justify-between items-center">
        <h2 className="text-lg font-poppins font-semibold">Top Selling</h2>
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
                <Statistic title="No. of Units: " value={card.quantity} />
                <Statistic
                  title="Selling Rate:"
                  value={card.growth}
                  valueStyle={{
                    color: card.trend === "up" ? "#3f8600" : "#cf1322",
                  }}
                  suffix={
                    card.trend === "up" ? (
                      <>
                        {" % "}
                        <ArrowUpOutlined />
                      </>
                    ) : (
                      <>
                        {" % "}
                        <ArrowDownOutlined />
                      </>
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

export default TopSelling;
