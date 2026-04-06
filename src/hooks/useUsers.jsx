import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../api/api";

export function useUsers() {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page") || "1";
  const itemsPerPage = searchParams.get("items") || "10";
  const name = searchParams.get("name") || "";
  const role = searchParams.get("role") || "";

  const { isLoading, data, error } = useQuery({
    queryKey: ["users", pageNumber, itemsPerPage, name, role],
    queryFn: () => getUsers(pageNumber, itemsPerPage, name, role),
  });

  //console.log("Data", data);
  //console.log("Error", error);
  return {
    isLoading,
    error,
    users: data?.data?.users,
    total: data?.data?.totalRecords,
  };
}
