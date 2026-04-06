import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import useUserDelete from "../hooks/useUserDelete";
import useUserActivate from "../hooks/useUserActivate";

function DeleteUser({
  isModalOpen = false,
  isActive = false,
  id = null,
  handleDeleteActivate = () => {},
  handleModal = () => {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { handleUserDelete } = useUserDelete();
  const { handleUserActivate } = useUserActivate();

  const confirmationPhrase = "I deactivate this account";

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
    setIsDisabled(value !== confirmationPhrase);
  }

  function handleConfirm() {
    if (inputValue === confirmationPhrase && isActive) {
      handleUserDelete(id);
    }
    if (!isActive) {
      handleUserActivate(id);
    }
    handleDeleteActivate(false);
    handleModal((prev) => !prev);
  }

  function handleModalClose() {
    handleDeleteActivate(false);
    handleModal((prev) => !prev);
  }

  return (
    <Modal
      className="font-poppins font-semibold text-base"
      open={isModalOpen}
      title={`${
        isActive
          ? "Are you sure you want to deactivate this user?"
          : "Reactivate this user?"
      }`}
      centered
      onCancel={handleModalClose}
      footer={[
        <Button key="cancel" onClick={handleModalClose}>
          Cancel
        </Button>,
        isActive ? (
          <Button
            key="confirm"
            danger
            type="primary"
            onClick={handleConfirm}
            disabled={isDisabled}
          >
            Confirm
          </Button>
        ) : (
          <Button key="confirm" type="primary" onClick={handleConfirm}>
            Activate User
          </Button>
        ),
      ]}
    >
      {isActive ? (
        <>
          <p className="font-thin font-poppins">
            To confirm, type the phrase:
            <br />
            <strong className="mt-2 font-semibold">
              "I deactivate this account"
            </strong>
          </p>
          <Input
            placeholder="Type the phrase here"
            value={inputValue}
            onChange={handleInputChange}
            className="mt-3"
          />
        </>
      ) : (
        <p className="font-thin font-poppins">
          Are you sure you want to activate this user?
        </p>
      )}
    </Modal>
  );
}

export default DeleteUser;
