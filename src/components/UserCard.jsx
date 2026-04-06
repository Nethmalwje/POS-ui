function UserCard({ role, total, outerColour, innerColour, icon }) {
  return (
    <div
      className={` ${outerColour} rounded-lg shadow-lg m-1 w-full h-auto flex justify-center border border-blue-200`}
    >
      <div className="flex flex-row items-center justify-between w-full p-2">
        <div className="flex flex-col">
          <h1 className="text-sm font-poppins font-semibold">{role}</h1>
          <p className="text-sm font-poppins font-semibold">{total}</p>
        </div>
        <div
          className={`flex items-center text-2xl justify-center ${innerColour} w-12 h-12 rounded-full`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
