import React from "react";
import IncomeOverview from "./IncomeOverview";
import UsersOverview from "./UsersOverview";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold font-poppins mb-4 md:text-left text-center">
        Dashboard
      </h1>
      <div className="flex flex-col gap-10">
        <IncomeOverview />
        <UsersOverview />
      </div>
    </div>
  );
};

export default AdminDashboard;
