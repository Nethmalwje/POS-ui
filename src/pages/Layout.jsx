import { useUserData } from "../context/userContext";
import AppLayout from "./AppLayout";

import CashierLayout from "./CashierLayout";

function Layout() {
  const { user } = useUserData();
  return (
    <div>{user?.role !== "Cashier" ? <AppLayout /> : <CashierLayout />}</div>
  );
}

export default Layout;
