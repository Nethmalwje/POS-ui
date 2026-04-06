import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function useResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isLoading, mutate: handlePasswordReset } = useMutation({
    mutationFn: (data) => resetPassword(token, data),
    onSuccess: (data) => {
      toast.success("Successfully reset the password");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return { isLoading, handlePasswordReset };
}

export default useResetPassword;
