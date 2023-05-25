import jwtDecode from "jwt-decode";

export const getParamFromJwt = (jwtToken, param) => {
  try {
    const decodedJwt = jwtDecode(jwtToken);
    const key = Object.keys(decodedJwt).find((key) => key.includes(param));
    if (param === "id") {
      return decodedJwt["id"];
    }
    if (key) {
      return decodedJwt[key];
    }
  }
  catch (error) {
    throw new Error("JWT not valid");
  }
};
