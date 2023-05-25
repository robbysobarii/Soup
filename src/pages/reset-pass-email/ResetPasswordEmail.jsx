import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { getApiUrl } from "utils/getApiUrl";
import axios from "axios";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { useState } from "react";

const API_ENDPOINT = `${getApiUrl()}/user-auth/send-otp`;

export const ResetPasswordEmail = () => {
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!formData.get("email")) {
      setEmailError("Email can't be empty.");
      return;
    }
    const email = formData.get("email").toString();
    await axios
      .post(API_ENDPOINT, { email })
      .then((res) => {
        console.log(res);
        localStorage.setItem("email", formData.get("email"));
        navigate("/reset-pass-otp");
      })
      .catch((err) => {
        console.error(err);
        setEmailError(err.response.data);
      });
  };

  return (
    <Container className={styles.container}>
      <Typography color="primary" variant="h5" style={{ fontWeight: "500" }}>
        Reset Password
      </Typography>
      <Typography color="primary">
        Send OTP code to your email address
      </Typography>
      <Box
        component="form"
        noValidate
        className={styles.form}
        onSubmit={handleSubmit}
      >
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
        <div className={styles.buttons}>
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <Button fullWidth variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button variant="contained" color="secondary" type="submit">
            Confirm
          </Button>
        </div>
      </Box>
    </Container>
  );
};
