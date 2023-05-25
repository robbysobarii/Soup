import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./style.module.css";
import { CheckoutProvider } from "contexts";

export const Layout = ({ isUser, isAdmin }) => {
  const location = useLocation();
  const hiddenFooterPaths = [
    "login",
    "register",
    "checkout",
    "email-confirm-success",
    "reset-pass-email",
    "reset-pass-otp",
    "reset-password",
    "success-purchase",
    "email-confirm",
    "verify",
  ];
  const hiddenHeaderPaths = [
    "email-confirm-success",
    "success-purchase",
    "email-confirm",
    "verify",
  ];
  const mainLocation = location.pathname.split("/")[1];
  const showFooter = !hiddenFooterPaths.includes(mainLocation);
  const showHeaderLink = !hiddenHeaderPaths.includes(mainLocation);
  return (
    <main>
      <CheckoutProvider>
        <Navbar
          isUser={isUser}
          isAdmin={isAdmin}
          showHeaderLink={showHeaderLink}
        />
        <Outlet />
      </CheckoutProvider>
      {showFooter && <Footer />}
    </main>
  );
};
