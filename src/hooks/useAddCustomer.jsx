import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCustomer } from "../api/api";

function useAddCustomer() {
  const { isLoading, mutate: handleAddCustomer } = useMutation({
    mutationFn: addCustomer,
    onSuccess: (data) => {
      toast.success("Added customer successfully");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add customer");
    },
  });
  return { isLoading, handleAddCustomer };
}

export default useAddCustomer;
