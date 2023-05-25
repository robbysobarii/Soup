import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { StyledLink } from "components/StyledLink";
import { AdminContext, CheckoutContext, LoginContext } from "contexts";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getParamFromJwt } from "utils/getParamFromJwt";
import styles from "./style.module.css";

const API_ENDPOINT = `${getApiUrl()}/user-auth/login`;

export const Login = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const [emailError, setEmailError] = useState({ error: false, message: "" });
  const [passError, setPassError] = useState({ error: false, message: "" });
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoginContext);
  const { setAdminLoggedIn } = useContext(AdminContext);
  const { getCheckoutCount } = useContext(CheckoutContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("email") === "") {
      setEmailError({ error: true, message: "Email is empty" });
      return;
    }
    setEmailError({ ...emailError, error: false });
    if (formData.get("password") === "") {
      setPassError({ error: true, message: "Password is empty" });
      return;
    }
    setPassError({ ...passError, error: false });
    await axios
      .post(API_ENDPOINT, formData)
      .then((res) => {
        setToken(res.data);
        const role = getParamFromJwt(res.data, "role");
        if (role === "admin") {
          setAdminLoggedIn(true);
          navigate("/admin");
        } else {
          setLoggedIn(true);
          getCheckoutCount();
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.data === "User Not Found.") {
          setEmailError({ error: true, message: "Your email is invalid." });
          return;
        }
        setEmailError({ ...emailError, error: false });
        if (err.response.data === "Wrong Password") {
          setPassError({ error: true, message: "Your password is invalid." });
          return;
        }
        setPassError({ ...passError, error: false });
        console.error(err);
        navigate("/");
      });
  };

  return (
    <Container className={styles.container}>
      <Typography color="primary" variant="h5" style={{ fontWeight: "500" }}>
        Welcome Back! Cheff
      </Typography>
      <Typography color="primary">Please login first</Typography>
      <Box
        component="form"
        noValidate
        className={styles.form}
        onSubmit={handleLogin}
      >
        <TextField
          type="email"
          size="small"
          label="Email"
          variant="outlined"
          name="email"
          error={emailError.error}
          helperText={emailError.error && emailError.message}
          fullWidth
        />
        <TextField
          type="password"
          size="small"
          label="Password"
          variant="outlined"
          name="password"
          error={passError.error}
          helperText={passError.error && passError.message}
          fullWidth
        />
        <Typography className={styles.forgotText} variant="span">
          Forgot Password?{" "}
          <StyledLink link="/reset-pass-email">Click Here</StyledLink>
        </Typography>

        <Button
          style={{ alignSelf: "flex-end", paddingInline: "40px" }}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Login
        </Button>
      </Box>
      <Typography className={styles.loginText} variant="span">
        Dont have account?{" "}
        <StyledLink link="/register">Sign Up here</StyledLink>
      </Typography>
    </Container>
  );
};
