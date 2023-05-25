import { getParamFromJwt } from "./getParamFromJwt";

export const checkUserRole = (role) => {
  if (localStorage.token) {
    try {
      const jwtRole = getParamFromJwt(localStorage.token, "role");
      return jwtRole === role;
    } catch (error) {
      return false;
    }
  }
  return false;
};
