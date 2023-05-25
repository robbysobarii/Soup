import { AdminRoutes } from "admin/AdminRoutes";
import { ScrollToTop } from "components/ScrollToTop";
import { AdminContext, LoginContext } from "contexts";
import { NotFound } from "pages/not-found";
import { ResetPasswordEmail } from "pages/reset-pass-email/ResetPasswordEmail";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import {
  Checkout,
  Detail,
  EmailConfirm,
  EmailConfirmSuccess,
  Home,
  Invoice,
  InvoiceDetail,
  Login,
  Menu,
  MyClass,
  Register,
  ResetPass,
  ResetPasswordOtp,
  SuccessPurchase,
  Verify,
} from "./pages";

export const App = () => {
  const { isUser } = useContext(LoginContext);
  const { isAdmin } = useContext(AdminContext);

  const mainRoutes = [
    { path: "menu/:slug", element: <Menu /> },
    { path: "detail/:slug", element: <Detail /> },
    { path: "verify/:slug", element: <Verify /> },
    { path: "email-confirm-success", element: <EmailConfirmSuccess /> },
    { path: "email-confirm", element: <EmailConfirm /> },
    { path: "login", element: <Login /> },
    { path: "reset-password", element: <ResetPass /> },
    { path: "reset-pass-email", element: <ResetPasswordEmail /> },
    { path: "reset-pass-otp", element: <ResetPasswordOtp /> },
    { path: "register", element: <Register /> },
    { path: "checkout", element: <Checkout /> },
    { path: "success-purchase", element: <SuccessPurchase /> },
    { path: "my-class", element: <MyClass /> },
    { path: "invoice", element: <Invoice /> },
    { path: "invoice/detail/:slug", element: <InvoiceDetail /> },
  ];

  const redirectIfLoggedIn = [
    "login",
    "register",
    "reset-password",
    "reset-pass-email",
    "reset-pass-otp",
  ];
  const redirectIfNotLoggedIn = [
    "checkout",
    "success-purchase",
    "my-class",
    "invoice",
    "invoice/detail/:slug",
  ];

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout isUser={isUser} isAdmin={isAdmin} />}>
          <Route
            index
            element={
              isAdmin ? (
                <Navigate path="*" to="/admin/dashboard" replace />
              ) : (
                <Home />
              )
            }
          />
          {mainRoutes.map((route) => {
            // If the route path is in redirectIfLoggedIn and the user is logged in, redirect to homepage
            if (isUser && redirectIfLoggedIn.includes(route.path)) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  // TODO: redirect ke 404
                  element={<Navigate to="/not-found" replace />}
                />
              );
            }
            // If the route path is in redirectIfNotLoggedIn and the user is not logged in, redirect to login page
            else if (!isUser && redirectIfNotLoggedIn.includes(route.path)) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  // TODO: redirect ke 404
                  element={<Navigate to="/login" replace />}
                />
              );
            }
            // Otherwise, render the route as usual
            else {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            }
          })}
        </Route>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
