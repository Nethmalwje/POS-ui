import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { uploadImage } from "../api/api";

function useImage() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const id = searchParams.get("id") || userId;
  const { isLoading, mutate: handleUpdateImage } = useMutation({
    mutationFn: (data) => uploadImage(id, data),
    onSuccess: (data) => {
      toast.success("Updated user image successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user image");
    },
  });
  return { isLoading, handleUpdateImage };
}

export default useImage;
