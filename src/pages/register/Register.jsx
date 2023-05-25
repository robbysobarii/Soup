import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { StyledLink } from "components/StyledLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPasswordValid } from "utils/checkPasswordValid";
import { getApiUrl } from "utils/getApiUrl";
import styles from "./style.module.css";
import { checkEmailValid } from "utils/checkEmailValid";

const API_ENDPOINT = `${getApiUrl()}/user-auth/register`;

export const Register = () => {
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (
      !formData.get("name") ||
      !formData.get("email") ||
      !formData.get("password") ||
      !formData.get("confirm-password")
    ) {
      setSnackbarOpen(true);
      return;
    }
    if(!checkEmailValid(formData.get("email"))){
      setEmailError("Please enter a valid email address.");
      return
    }
    setEmailError("");
    if(!checkPasswordValid(formData.get("password"))){
      setError("Password must be at least 8 characters long and contain at least one uppercase letter.");
      return
    }
    if (formData.get("password") !== formData.get("confirm-password")) {
      setError("The password confirmation does not match.");
      return;
    }
    setError("");
    await axios
      .post(API_ENDPOINT, formData)
      .then((res) => {
        console.log(res);
        navigate("/email-confirm");
      })
      .catch((err) => {
        console.error(err);
        if(err.response.data === "User Already Registered."){
          setEmailError("Email is already used.")
        }
        else {
          navigate("/");
        }
      });
  };

  return (
    <Container className={styles.container}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={"error"}
          sx={{ width: "100%" }}
        >
          Required fields missing. Please complete all fields.
        </Alert>
      </Snackbar>
      <Typography color="primary" variant="h5" style={{ fontWeight: "500" }}>
        Are you ready become a professional cheff?
      </Typography>
      <Typography color="primary">Please register first</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <TextField
          size="small"
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
        />
        <TextField
          type="email"
          size="small"
          label="Email"
          variant="outlined"
          name="email"
          error={emailError !== ""}
          helperText={emailError}
          fullWidth
        />
        <TextField
          type="password"
          size="small"
          label="Password"
          variant="outlined"
          name="password"
          error={error !== ""}
          fullWidth
        />
        <TextField
          type="password"
          size="small"
          label="Confirm Password"
          variant="outlined"
          name="confirm-password"
          error={error !== ""}
          helperText={error}
          fullWidth
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          style={{ alignSelf: "flex-end" }}
        >
          Sign Up
        </Button>
      </Box>
      <Typography className={styles.loginText} variant="span">
        Have Account? <StyledLink link="/login">Click Here</StyledLink>
      </Typography>
    </Container>
  );
};
