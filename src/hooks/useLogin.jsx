import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/userContext";

function useLogin() {
  const navigate = useNavigate();
  const { setUserLogin } = useUserData();

  const { isLoading, mutate: handleLogin } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      //console.log(data);
      toast.success("Login successful");
      setUserLogin(data.token);
      navigate("/dashboard");
    },
    onError: (error) => {
      //  console.log(error);
      toast.error(error);
    },
  });
  return { isLoading, handleLogin };
}

export default useLogin;
