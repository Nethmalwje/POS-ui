import React, { useState } from "react";
import { Typography } from "antd";
import ExpiringStocksTable from "./ExpiringStocksTable";
import ExpiredStocksTable from "./ExpiredStocksTable";

const { Title } = Typography;

const ExpiringOverview = () => {
  const pageSize = 5;
  const [expiringCurrentPage, setExpiringCurrentPage] = useState(1);
  const [expiredCurrentPage, setExpiredCurrentPage] = useState(1);

  return (
    <div>
      <div className="pt-5">
        <h2 className="text-lg font-poppins font-semibold">
          Expiring Stocks Overview
        </h2>
      </div>
      <div className="lg:flex gap-5 pt-5">
        <ExpiringStocksTable
          // currentPage={expiringCurrentPage}
          // setCurrentPage={setExpiringCurrentPage}
          // pageSize={pageSize}
          currentPage={1}
          setCurrentPage={setExpiringCurrentPage}
          pageSize={10}
        />
        <ExpiredStocksTable
          // currentPage={expiredCurrentPage}
          // setCurrentPage={setExpiredCurrentPage}
          // pageSize={pageSize}
          currentPage={1}
          setCurrentPage={setExpiredCurrentPage}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default ExpiringOverview;
