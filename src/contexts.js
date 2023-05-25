import axios from "axios";
import { useAsync } from "hooks/useAsync";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserRole } from "utils/checkUserRole";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";

export const LoginContext = createContext();
export const AdminContext = createContext();
export const CheckoutContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUser, setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(checkUserRole("user"));
  }, []);
  // const isUser = useMemo(() => checkUserRole("user"), [isLoggedIn]);

  return (
    <LoginContext.Provider value={{ isUser, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    setAdminLoggedIn(checkUserRole("admin"));
  }, []);
  // const isAdmin = useMemo(() => checkUserRole("admin"), [isAdminLoggedIn]);

  return (
    <AdminContext.Provider value={{ isAdmin, setAdminLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

async function asyncCheckoutCount() {
  return axios.get(`${getApiUrl()}/checkout-count/get`, getAuthorizedOptions());
}

export const CheckoutProvider = ({ children }) => {
  const {
    value,
    status,
    execute: getCheckoutCount,
    error
  } = useAsync(asyncCheckoutCount, false);
  const [checkoutCount, setCheckoutCount] = useState(null);
  const { isUser, setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUser) {
      if (status === "idle" || checkoutCount === null) {
        getCheckoutCount();
      }
      if (status === "success") {
        setCheckoutCount(value.data);
      }
      if (status === "error") {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
      }
    }
  }, [isUser, status, getCheckoutCount, value]);

  return (
    <CheckoutContext.Provider value={{ checkoutCount, getCheckoutCount }}>
      {children}
    </CheckoutContext.Provider>
  );
};
