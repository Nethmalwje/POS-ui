import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserPassword } from "../api/api";
import useLogout from "./useLogout";
import { set } from "react-hook-form";

function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { handleLogoutUser } = useLogout();

  const { isLoading, mutate: handlePasswordUpdate } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      toast.success("Password Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["users", "user"],
      });
      setTimeout(() => handleLogoutUser(), 1000);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isLoading, handlePasswordUpdate };
}

export default useUpdatePassword;
