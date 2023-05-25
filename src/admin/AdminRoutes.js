import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLogin, AdminDashboard } from "./pages";
import { PaymentMethod } from "./pages/payment-method/Main";
import { useContext } from "react";
import { AdminContext } from "contexts";
import { Layout } from "./components/Layout";
import { paymentRoutes } from "./pages/payment-method/routes";
import { User } from "./pages/user";
import { userAdminRoutes } from "./pages/user/routes";

export const AdminRoutes = () => {
  const { isAdmin } = useContext(AdminContext);

  return (
    <Routes>
      <Route
        index
        element={<Navigate path="*" to="/admin/dashboard" replace />}
      />
      <Route path="dashboard" element={<Layout />}>
        <Route
          index
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate path="*" to="/not-found" replace />
            )
          }
        />
        <Route
          path="payment-method"
          element={
            isAdmin ? (
              <PaymentMethod />
            ) : (
              <Navigate path="*" to="/not-found" replace />
            )
          }
        />
        {paymentRoutes.map((route) => (
          <Route
            key={route.path}
            path={`payment-method/${route.path}`}
            element={
              isAdmin ? (
                route.component
              ) : (
                <Navigate path="*" to="/not-found" replace />
              )
            }
          />
        ))}
        <Route
          path="user"
          element={
            isAdmin ? <User /> : <Navigate path="*" to="/not-found" replace />
          }
        />
        {userAdminRoutes.map((route) => (
          <Route
            key={route.path}
            path={`user/${route.path}`}
            element={
              isAdmin ? (
                route.component
              ) : (
                <Navigate path="*" to="/not-found" replace />
              )
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
