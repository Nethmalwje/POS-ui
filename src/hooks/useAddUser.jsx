import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addUser } from "../api/api";

function useAddUser() {
  const { isLoading, mutate: handleAddUser } = useMutation({
    mutationFn: addUser, // Passes no ID, so it creates a user
    onSuccess: (data) => {
      toast.success("Added user successfully");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add user");
    },
  });
  return { isLoading, handleAddUser };
}

export default useAddUser;
