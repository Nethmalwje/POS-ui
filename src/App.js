import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { Suspense, useEffect } from "react";
import { Tooltip, initTWE } from "tw-elements";
import UserProvider from "./context/userContext";
import AllUsers from "./pages/AllUsers";
import ActionProvider from "./context/actionContext";
import CreateUser from "./components/UserForm";
import UpdateUser from "./pages/UpdateUser";
import View from "./pages/View";
import Customers from "./pages/Customers";
import ResetPassword from "./pages/ResetPassword";
import CreateCustomer from "./pages/CreateCustomer";
import NewLogin from "./pages/NewLogin";
import RestrictAccess from "./pages/RestrictAccess";
import Transaction from "./pages/Transactions";
import AllProducts from "./pages/AllProducts";
import CreateProduct from "./pages/CreateProduct";
import CreateItem from "./pages/CreateItem";
import AllItems from "./pages/AllItems";
import Layout from "./pages/Layout";
import Stashed from "./components/cashier/Stashed";
import StockList from "./components/StockList";
import ExpiredStocksTable from "./components/ExpiredStocksTable";
import ExpiringStocksTable from "./components/ExpiringStocksTable";
import AddStockForm from "./components/AddStockForm";
import Locations from "./components/Locations";
import Regions from "./components/Regions";

function App() {
  useEffect(() => {
    initTWE({ Tooltip });
  }, []);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <UserProvider>
        <ActionProvider>
          <QueryClientProvider client={queryClient}>
            {/* <Cashier_Dash /> */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  {/* <Route path="stashedBills" element={<ShowStashedBills />} /> */}
                  <Route path="stashedBills" element={<Stashed />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<AllUsers />} />
                  <Route
                    path="create"
                    element={
                      <RestrictAccess allowedRoles={["General Manager"]}>
                        <CreateUser />
                      </RestrictAccess>
                    }
                  />
                  <Route path="update/:userId" element={<UpdateUser />} />
                  <Route path="view" element={<View />} />
                  <Route path="customers" element={<Customers />} />
                  <Route
                    path="customers/register"
                    element={<CreateCustomer />}
                  />
                  <Route path="transactions" element={<Transaction />} />
                  <Route path="products" element={<AllProducts />} />
                  <Route path="items" element={<AllItems />} />
                  <Route path="stock" element={<StockList />} />
                  <Route path="create-product" element={<CreateProduct />} />
                  <Route path="create-item" element={<CreateItem />} />
                  <Route path="create-stock" element={<AddStockForm />} />
                  <Route path="expiring" element={<ExpiringStocksTable />} />
                  <Route path="expired" element={<ExpiredStocksTable />} />
                  <Route path="regions" element={<Regions />} />
                  <Route path="locations" element={<Locations />} />
                </Route>
                <Route path="login" element={<NewLogin />} />
                <Route path="reset/:token" element={<ResetPassword />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="not-found" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                  style: {
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "500",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    borderRadius: "7px",
                    backdropFilter: "blur(10px)",
                  },
                },

                error: {
                  duration: 5000,
                  style: {
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "500",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    borderRadius: "7px",
                    backdropFilter: "blur(10px)",
                  },
                },
                style: {
                  fontSize: "16px",
                  fontWeight: "500",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  borderRadius: "7px",
                  backdropFilter: "blur(10px)",
                },
              }}
            />
          </QueryClientProvider>
        </ActionProvider>
      </UserProvider>
    </Suspense>
  );
}

export default App;
