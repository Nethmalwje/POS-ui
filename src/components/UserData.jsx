import { useState } from "react";
import { formatDate } from "../helpers/formatDate";
import HourGlass from "./HourGlass";
import { Button } from "antd";
import UserForm from "./UserForm";
import { useAction } from "../context/actionContext";

function UserData({ user, isLoggedUser }) {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const {
    handleUpdatingUser,
    passwordUpdateClicked,
    setPasswordUpdateClicked,
  } = useAction();

  function handleUpdate() {
    handleUpdatingUser(true);
    setIsUpdateClicked(true);
  }

  function handleCancel() {
    handleUpdatingUser(false);
    setIsUpdateClicked(false);
    setPasswordUpdateClicked(false);
  }

  if (!user) {
    return <HourGlass />;
  }

  return (
    <>
      <div
        className={`${
          isLoggedUser
            ? "flex flex-col rounded-lg items-center border-2 border-blue-500 p-4 shadow-md"
            : ""
        }`}
      >
        <div
          className={`${
            isLoggedUser
              ? "flex flex-row w-full items-center rounded-lg justify-center"
              : ""
          }`}
        >
          <div
            className={`flex flex-col  items-center p-4 rounded-lg ${
              isLoggedUser
                ? " w-1/2"
                : user.is_active
                ? "bg-green-200 border-green-700 border-2 "
                : "bg-slate-200 border-slate-700 border-2 "
            }`}
          >
            <div className="relative">
              <img
                src={user?.image ? user?.image : "default_user.png"}
                alt="user"
                className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-42 lg:h-42 mx-auto rounded-full border-4 ${
                  user?.is_active && !isLoggedUser
                    ? "border-green-300"
                    : "border-gray-500"
                }`}
              />
            </div>
            <div className="text-center mt-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold font-poppins">
                {user?.name}
              </h1>
              <h3 className="font-poppins font-semibold text-gray-600">
                {user?.role}
              </h3>
            </div>
          </div>
          <div className={`p-4 w-full ${isLoggedUser ? "pr-7" : ""}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold font-poppins mt-2">
              <div>
                <h3>Employee ID:</h3>
                <p className="font-thin">{user?.employee_id}</p>
              </div>
              <div>
                <h3>Email Address:</h3>
                <p className="font-thin">{user?.email}</p>
              </div>
              <div>
                <h3>Phone Number:</h3>
                <p className="font-thin">
                  {user?.mobile ? user.mobile : "Not Found"}
                </p>
              </div>
              <div>
                <h3>Date Joined:</h3>
                <p className="font-thin">
                  {user?.account_created_at
                    ? formatDate(user.account_created_at)
                    : "Not Found"}
                </p>
              </div>
              <div>
                <h3>Last Login:</h3>
                <p className="font-thin">
                  {user?.last_login_at
                    ? formatDate(user.last_login_at)
                    : "Not Found"}
                </p>
              </div>
              <div>
                <h3>Account Status:</h3>
                <p
                  className={`font-thin rounded-lg px-2 py-1 text-center text-white inline-block ${
                    user?.is_active ? "bg-green-400" : "bg-gray-300"
                  }`}
                >
                  {user?.is_active ? "Active" : "Deactivated"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {isLoggedUser && !isUpdateClicked && !passwordUpdateClicked && (
          <div className="pb-4">
            {" "}
            <Button type="primary" onClick={handleUpdate}>
              Update Password
            </Button>{" "}
          </div>
        )}
      </div>
      {isLoggedUser && (isUpdateClicked || passwordUpdateClicked) && (
        <div className="mt-4">
          <UserForm
            user={user}
            isLoggedUser={true}
            handleProfileUpdate={handleCancel}
          />
        </div>
      )}
    </>
  );
}

export default UserData;
