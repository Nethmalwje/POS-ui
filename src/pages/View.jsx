import { useSearchParams } from "react-router-dom";
import { useUserData } from "../context/userContext";
import MyDetails from "../components/MyDetails";
import { useEffect } from "react";

function View() {
  const { user } = useUserData();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user && user.id) {
      searchParams.set("id", user.id);
      setSearchParams(searchParams);
    }
  }, [user, searchParams, setSearchParams]);

  return <MyDetails />;
}

export default View;
