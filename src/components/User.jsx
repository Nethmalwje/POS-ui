import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useState } from "react";
import ViewUser from "./ViewUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAction } from "../context/actionContext";
import DeleteUser from "./DeleteUser";
import { useUserData } from "../context/userContext";

function User({ userData }) {
  const { employee_id, name, role, image, is_active } = userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleUpdatingUser, handleDeleteActivate, confirmDeleteActivate } =
    useAction();
  const { user } = useUserData();
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <span onClick={handleModal}>View Details</span>,
    },
    {
      key: "2",
      label: <span onClick={handleUpdateUserClick}>Update User</span>,
    },
    {
      key: "3",
      label:
        user?.role === "General Manager" ? (
          <span onClick={handleDeleteUserClick}>
            {is_active ? "Delete User" : "Activate User"}
          </span>
        ) : null,
    },
  ];

  function handleModal() {
    setIsModalOpen((prev) => !prev);
    searchParams.set("id", userData.employee_id);
    setSearchParams(searchParams);
  }

  function handleUpdateUserClick() {
    handleUpdatingUser(true);
    navigate(`/update/${employee_id}`);
  }

  function handleDeleteUserClick() {
    setIsDeleteModalOpen(true);
  }

  return (
    <>
      <div
        className={`group flex flex-col md:flex-row border ${
          is_active
            ? "bg-green-100 text-green-700 hover:bg-green-300 hover:text-green-600"
            : "bg-gray-100 text-gray-600 hover:bg-gray-300 hover:text-gray-700"
        } border-blue-500 rounded-md m-3 p-3 gap-4 md:gap-8 hover:shadow-lg`}
      >
        <div className="flex-shrink-0">
          <img
            src={image ? image : "default_user.png"}
            alt="user"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-base font-semibold font-poppins truncate">
            {name}
          </h1>
          <p className="text-xs font-semibold font-poppins text-gray-500 truncate">
            {role}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <span
            className={`font-normal text-xs font-poppins rounded-2xl px-2 py-1 ${
              is_active ? "bg-green-400 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {is_active ? "Active" : "Deactivated"}
          </span>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
          >
            <Button
              className={`border ${
                is_active
                  ? "bg-green-100 border-green-500"
                  : "bg-gray-100 border-gray-400"
              }`}
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </div>
      </div>
      {isModalOpen && (
        <ViewUser isModalOpen={isModalOpen} handleModal={handleModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteUser
          isModalOpen={isDeleteModalOpen}
          isActive={is_active}
          id={employee_id}
          handleDeleteActivate={setIsDeleteModalOpen}
        />
      )}
    </>
  );
}

export default User;
