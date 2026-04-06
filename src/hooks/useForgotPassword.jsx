import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/api";
import toast from "react-hot-toast";

function useForgotPassword() {
  const { isLoading, mutate: handlePasswordReset } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { isLoading, handlePasswordReset };
}

export default useForgotPassword;
