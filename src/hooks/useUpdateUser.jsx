import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../api/api";

function useUpdateUser() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const id = searchParams.get("id") || userId;
  const { isLoading, mutate: handleUpdateUser } = useMutation({
    mutationFn: (data) => updateUser(id, data),
    onSuccess: (data) => {
      toast.success("Updated user details successfully");
      queryClient.invalidateQueries({
        queryKey: ["user", "users"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
  return { isLoading, handleUpdateUser };
}

export default useUpdateUser;
