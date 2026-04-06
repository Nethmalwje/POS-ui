import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, theme } from "antd";
import Name from "./Name";
import Role from "./Role";
import Email from "./Email";
import Phone from "./Phone";
import UserImage from "./UserImage";
import useAddUser from "../hooks/useAddUser";
import HourGlass from "./HourGlass";
import { useAction } from "../context/actionContext";
import useUpdateUser from "../hooks/useUpdateUser";
import useImage from "../hooks/useImage";
import PasswordUpdate from "./PasswordUpdate";
import { useUserData } from "../context/userContext";
import Address from "./Address";
import useAddCustomer from "../hooks/useAddCustomer";

function UserForm({
  user = {},
  isLoggedUser = false,
  handleProfileUpdate = () => {},
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [imageFile, setImageFile] = useState(null);
  const [resetImage, setResetImage] = useState(false);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const { isLoading, handleAddUser } = useAddUser();
  const { updatingUser } = useAction();
  const { isLoading: isUpdating, handleUpdateUser } = useUpdateUser();
  const { isLoading: isImageUploading, handleUpdateImage } = useImage();
  const { user: currentUser } = useUserData();
  const { isLoading: isAddingCustomer, handleAddCustomer } = useAddCustomer();

  useEffect(() => {
    if (user && updatingUser) {
      reset({
        name: user.name || "",
        role: user.role || "",
        email: user.email || "",
        phone: user.mobile || "",
      });
      setImageFile(user.image || "");
    }
  }, [user, updatingUser, reset]);

  function onImageChange(file) {
    setImageFile(file);
    setIsImageRemoved(true);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setIsImageRemoved(true);
  }

  function handleClear() {
    reset({
      name: "",
      role: "",
      email: "",
      phone: "",
    });
    setImageFile(null);
    setResetImage(true);
    setTimeout(() => setResetImage(false), 0);
    setIsImageRemoved(false);
  }

  async function onSubmit(data) {
    const formattedPhoneNumber = data.phone.padStart(10, "0").slice(0, 10);
    //console.log("Formatted phone number:", data);
    const newUser = {
      ...data,
      phone: formattedPhoneNumber,
    };

    if (currentUser.role === "Cashier") {
      console.log("Adding address to user data:", newUser);
      handleAddCustomer(newUser);
      reset({
        name: "",
        role: "",
        email: "",
        phone: "",
        address: "", // Assuming there is an address field as well
      });
      setImageFile(null);
      setIsImageRemoved(false);
    } else if (updatingUser) {
      // console.log("Updating user with data:", newUser);
      handleUpdateUser(newUser);
      if (isImageRemoved) {
        handleUpdateImage(imageFile); // Handle the image update
      }
    } else {
      // console.log("Creating new user with data:", newUser);
      console.log("new user data", newUser);
      if (imageFile) {
        newUser.image = imageFile;
      }
      handleAddUser(newUser);
    }
  }

  if (isLoading || isUpdating || isImageUploading) {
    return <HourGlass />;
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      {!isLoggedUser && (
        <h1 className="text-2xl font-bold font-poppins m-4 md:text-left text-center">
          <strong>
            {updatingUser
              ? "Update User Details"
              : currentUser.role !== "Cashier"
              ? "Add New User"
              : "Add New Customer"}
          </strong>
        </h1>
      )}
      <div className="container p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 min-w-[675px]:w-9/12"
        >
          {!isLoggedUser && (
            <Name
              errors={errors}
              control={control}
              role={user?.name}
              currentUserRole={currentUser.role}
            />
          )}
          {!isLoggedUser && currentUser.role !== "Cashier" && (
            <Role errors={errors} control={control} role={user?.role} />
          )}
          {!isLoggedUser && currentUser.role === "Cashier" && (
            <Address errors={errors} control={control} />
          )}
          {!isLoggedUser && currentUser.role !== "Cashier" && (
            <Email errors={errors} control={control} role={user?.email} />
          )}
          {!isLoggedUser && (
            <Phone
              errors={errors}
              control={control}
              phone={user?.mobile}
              isLoggedUser={isLoggedUser}
            />
          )}
          {!isLoggedUser && currentUser.role !== "Cashier" && (
            <>
              <UserImage
                onImageChange={onImageChange}
                reset={resetImage}
                image={imageFile}
              />

              <div className="flex justify-center gap-4 mt-4">
                {isLoggedUser ? (
                  <Button onClick={handleProfileUpdate}>Cancel</Button>
                ) : (
                  <Button type="default" htmlType="reset" onClick={handleClear}>
                    Clear All
                  </Button>
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isValid || isLoading || isUpdating}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
          {!isLoggedUser && currentUser.role === "Cashier" && (
            <div className="flex justify-center gap-4 mt-4">
              <Button type="default" htmlType="reset" onClick={handleClear}>
                Clear All
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isValid || isLoading || isUpdating}
              >
                Submit
              </Button>
            </div>
          )}
        </form>
        {isLoggedUser && <PasswordUpdate />}
      </div>
      {/* </div> */}
    </>
  );
}

export default UserForm;
