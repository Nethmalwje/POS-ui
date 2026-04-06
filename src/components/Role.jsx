import { Select } from "antd";
import { Controller } from "react-hook-form";
import { useUserData } from "../context/userContext";

const { Option } = Select;

function Role({ errors, control, role }) {
  const { user } = useUserData();
  const rolesList = [
    "General Manager",
    "Regional Manager",
    "Inventory Manager",
    "Store Manager",
    "Cashier",
  ];

  const allowedRoles = rolesList.filter(
    (role) => rolesList.indexOf(role) > rolesList.indexOf(user.role)
  );
  const options = allowedRoles.map((role) => ({ value: role, label: role }));
  return (
    <>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Role
        </label>
        <Controller
          name="role"
          defaultValue={role}
          control={control}
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <Select
              {...field}
              style={{
                width: "100%",
                borderColor: errors.role ? "red" : "green",
              }}
              placeholder="Select Role"
              options={options}
            />
          )}
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>
    </>
  );
}

export default Role;
