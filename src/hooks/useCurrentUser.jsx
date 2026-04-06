import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/api";
import { useUserData } from "../context/userContext";

export function useCurrentUser() {
  const { user } = useUserData();
  const id = user.id;
  const { isLoading, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { isLoading, error, user: data?.user };
}
