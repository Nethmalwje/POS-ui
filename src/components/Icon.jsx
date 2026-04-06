function Icon({ path, children }) {
  return (
    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
      <svg
        className="flex-shrink-0 size-4 text-gray-500 dark:text-neutral-500"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path}></path>
        {children}
      </svg>
    </div>
  );
}

export default Icon;
