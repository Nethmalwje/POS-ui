import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/api";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get("page") || "1";
  const itemsPerPage = searchParams.get("items") || "10";
  const name = searchParams.get("name") || "";

  const { isLoading, data, error } = useQuery({
    queryKey: ["products", pageNumber, itemsPerPage, name],
    queryFn: () => getProducts(pageNumber, itemsPerPage, name),
  });

  //console.log("Data", data);
  //console.log("Error", error);
  return { isLoading, error, products: data?.data?.products };
}
