import { Select } from "antd";
import { useUserData } from "../context/userContext";

function Selection({ searchSize, onRoleSelect, onSearchRole }) {
  const { user } = useUserData();

  const rolesList = [
    "All",
    "General Manager",
    "Regional Manager",
    "Inventory Manager",
    "Store Manager",
    "Cashier",
  ];

  const allowedRoles = rolesList.filter(
    (role) =>
      role === "All" || rolesList.indexOf(role) > rolesList.indexOf(user.role)
  );
  const options = allowedRoles.map((role) => ({ value: role, label: role }));

  return (
    <Select
      className="w-full md:w-64"
      size={searchSize}
      showSearch
      placeholder="Select the role"
      optionFilterProp="label"
      onChange={onSearchRole}
      options={options}
    />
  );
}

export default Selection;
