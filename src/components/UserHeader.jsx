import { useUserData } from "../context/userContext";

function UserHeader() {
  const { fullUser: user } = useUserData();
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <div className="flex flex-row items-center justify-between p-2 rounded-2xl">
      <img
        className="rounded-full border-2 border-blue-600 w-14 h-14"
        src={user?.image ? user.image : "default_user.png"}
        alt="avatar"
      />
      <div className="flex flex-col items-start ml-2">
        <h4 className="text-base font-semibold font-poppins">{firstName}</h4>
        <h5 className="text-xs font-semibold font-poppins text-gray-600">
          {user?.role}
        </h5>
      </div>
    </div>
  );
}

export default UserHeader;
