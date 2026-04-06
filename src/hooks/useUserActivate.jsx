import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { activateUser } from "../api/api";

function useUserActivate() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: handleUserActivate } = useMutation({
    mutationFn: activateUser,
    onSuccess: (data) => {
      toast.success("Account activated successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    },
  });

  return { isLoading, handleUserActivate };
}

export default useUserActivate;
