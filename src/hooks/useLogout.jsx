import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useUserData } from "../context/userContext";
import { logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const { setUserLogout } = useUserData();
  const navigate = useNavigate();
  const { isLoading, mutate: handleLogoutUser } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUserLogout();
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to logout user");
    },
  });
  return { isLoading, handleLogoutUser };
}

export default useLogout;
