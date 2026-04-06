import { useUsers } from "../hooks/useUsers";
import HourGlass from "./HourGlass.jsx";
import User from "./User.jsx";

//import "../UserList.css";

function UserList() {
  const { isLoading, users, error } = useUsers();

  if (isLoading) {
    return <HourGlass />;
  }

  if (error) {
    return (
      <div className="text-blue-600 flex flex-col items-center font-poppins font-semibold text-xl bg-blue-100 border rounded-lg border-blue-200 p-4 text-center m-5">
        <img className="w-4/12 h-auto pt-5" src={"UserNotFound.png"} alt="😥" />
        <h2 className="p-2">{error}</h2>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="text-red-600 flex flex-col items-center font-poppins font-semibold text-xl bg-red-100 border rounded-lg border-red-200 p-4 text-center m-5">
        <img className="w-2/5 h-auto pt-5" src={"error.png"} alt="😥" />
        <h2 className="p-5">No users found. Try refreshing or relogging.</h2>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll max-h-80">
      {users.map((user) => (
        <User userData={user} key={user.employee_id} />
      ))}
    </div>
  );
}

export default UserList;
