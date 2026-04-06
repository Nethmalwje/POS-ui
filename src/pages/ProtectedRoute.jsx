import { useEffect, useState } from "react";
import { useUserData } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import HourGlass from "../components/HourGlass";

function ProtectedRoute({ children }) {
  const { user, loading } = useUserData(); // Get loading state
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Wait until loading is false
      if (user) {
        setIsAuthenticated(user.exp > Math.floor(Date.now() / 1000));
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [user, loading]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (loading || isAuthenticated === null) {
    // Show loading indicator while loading
    return <HourGlass />;
  }

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
