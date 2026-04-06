import React from "react";
import { Space, theme } from "antd";

function CompactCard({ location }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <div
      // style={{
      //   padding: 0,
      //   marginTop: 20,
      //   minHeight: 60,
      //   background: colorBgContainer,
      //   borderRadius: borderRadiusLG,
      // }}
      >
        <Space.Compact>
          <div className="flex m-0 pr-5">
            <div
            // className="px-0 py-2 mx-2"
            >
              Location:{" "}
            </div>
            <div className="pl-2 font-semibold">{location}</div>
          </div>
        </Space.Compact>
      </div>
    </>
  );
}

export default CompactCard;
