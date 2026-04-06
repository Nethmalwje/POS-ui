import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkMailAccess } from "../api/api";
import { useUserData } from "../context/userContext";

function useAccess() {
  const { handleEmailChange, handleRoleChange } = useUserData();
  const { isLoading, mutate: handleAccess } = useMutation({
    mutationFn: checkMailAccess,
    onSuccess: (data) => {
      handleEmailChange(data.email);
      handleRoleChange(data.role);
    },
    onError: (error) => {
      //  console.log(error);
      toast.error(error);
    },
  });
  return { isLoading, handleAccess };
}

export default useAccess;
