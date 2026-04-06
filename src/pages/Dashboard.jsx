import AdminDashboard from "../components/AdminDashboard";

import { useUserData } from "../context/userContext";
import Cashier from "./cashier_dash/Cashier";
import Cashier_Dash from "./cashier_dash/Cashier_Dash";

function Dashboard() {
  const { user } = useUserData();
  return (
    <div>{user?.role !== "Cashier" ? <AdminDashboard /> : <Cashier />}</div>
  );
}

export default Dashboard;
