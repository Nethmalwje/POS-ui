import { useUserData } from "../context/userContext";
import UserData from "./UserData";

function MyDetails() {
  const { fullUser: user } = useUserData();

  // if (isLoading) {
  //   return <HourGlass />;
  // }
  return <UserData user={user} isLoggedUser={true} />;
}

export default MyDetails;
