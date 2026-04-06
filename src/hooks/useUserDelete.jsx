import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser } from "../api/api";

function useUserDelete() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: handleUserDelete } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success("Account deactivated successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      // Ensure the error message is a string
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isLoading, handleUserDelete };
}

export default useUserDelete;
