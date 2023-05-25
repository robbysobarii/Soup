import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { getApiUrl } from "utils/getApiUrl";
import axios from "axios";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { useState } from "react";

const API_ENDPOINT = `${getApiUrl()}/user-auth/verify-otp`;

export const ResetPasswordOtp = () => {
  const [isError, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!localStorage.getItem("email")) {
      navigate("/");
    }
    if(!formData.get("otp")){
      setError(true)
      return
    }
    const otp = formData.get("otp").toString();
    const data = {
      email: localStorage.getItem("email"),
      otp_input: otp,
    };
    await axios
      .post(API_ENDPOINT, data)
      .then((res) => {
        setError(false);
        console.log(res);
        navigate("/reset-password");
      })
      .catch((err) => {
        console.error(err);
        if(err.response.data === "OTP is not valid"){
          setError(true);
        }
        else {
          navigate("/");
        }
      });
  };

  return (
    <Container className={styles.container}>
      <Typography color="primary" variant="h5" style={{ fontWeight: "500" }}>
        Reset Password
      </Typography>
      <Typography color="primary">We've sent you the OTP code. Insert your OTP code here</Typography>
      <Box
        component="form"
        noValidate
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <TextField
          size="small"
          label="OTP"
          variant="outlined"
          name="otp"
          inputProps={{ maxLength: 6 }}
          error={isError}
          helperText={isError && "OTP is not valid."}
          fullWidth
        />
        <div className={styles.buttons}>
          <Button variant="contained" color="secondary" type="submit">
            Confirm
          </Button>
        </div>
      </Box>
    </Container>
  );
};
