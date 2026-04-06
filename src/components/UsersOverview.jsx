import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import UserCard from "./UserCard";
import RadialBarChart from "./RadialBarChart";
import EmployeeGrowthChart from "./EmployeeGrowthChart";

function UsersOverview() {
  return (
    <div className="flex flex-col">
      <h1 className="text-lg font-poppins font-semibold">Employee Overview</h1>
      <div className="flex flex-row items-center justify-between">
        <div>
          <RadialBarChart />
        </div>
        <div>
          <EmployeeGrowthChart />
        </div>
        <div className="flex flex-col items-center justify-center">
          <UserCard
            role="Active Employees"
            total="10"
            outerColour="bg-green-200"
            innerColour="bg-green-400"
            icon={<UserOutlined />}
          />
          <UserCard
            role="Inactive Employees"
            total="5"
            outerColour="bg-red-200"
            innerColour="bg-red-400"
            icon={<UserDeleteOutlined />}
          />

          <UserCard
            role="Temporary Employees"
            total="5"
            outerColour="bg-yellow-200"
            innerColour="bg-yellow-400"
            icon={<UserSwitchOutlined />}
          />
          <UserCard
            role="New Employees this month"
            total="5"
            outerColour="bg-blue-200"
            innerColour="bg-blue-400"
            icon={<UserAddOutlined />}
          />
        </div>
      </div>
    </div>
  );
}

export default UsersOverview;
