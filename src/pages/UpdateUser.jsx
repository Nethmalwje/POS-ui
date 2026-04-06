import React from "react";
import { useUser } from "../hooks/useUser";
import HourGlass from "../components/HourGlass";
import UserForm from "../components/UserForm";

function UpdateUser() {
  const { isLoading: isFetching, user } = useUser();

  if (isFetching) {
    return <HourGlass />;
  }
  return <UserForm user={user} />;
}

export default UpdateUser;
