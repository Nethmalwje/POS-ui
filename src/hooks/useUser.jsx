import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getUser } from "../api/api";

export function useUser() {
  const [searchParams] = useSearchParams();
  const { userId } = useParams();
  const id = searchParams.get("id") || userId;

  const { isLoading, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { isLoading, error, user: data?.user };
}
