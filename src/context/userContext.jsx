import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [fullUser, setFullUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        if (decodedUser.exp > Math.floor(Date.now() / 1000)) {
          setUser(decodedUser);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const setUserLogin = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const setUserLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setFullUser({});
    setEmail("");
    setRole("");
  };

  function storeFullUser(user) {
    setFullUser(user);
  }

  function handleEmailChange(value) {
    setEmail((email) => value);
  }

  function handleRoleChange(newRole) {
    setRole((role) => newRole);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        fullUser,
        storeFullUser,
        setUserLogin,
        setUserLogout,
        loading,
        handleEmailChange,
        handleRoleChange,
        role,
        email,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
