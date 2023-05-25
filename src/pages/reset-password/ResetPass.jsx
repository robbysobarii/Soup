import { Container, TextField, Typography, Button, Box } from "@mui/material";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getApiUrl } from "utils/getApiUrl";
import axios from "axios";
import { checkPasswordValid } from "utils/checkPasswordValid";

const API_ENDPOINT = `${getApiUrl()}/user-auth/change-password`;

export const ResetPass = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!localStorage.getItem("email")) {
      navigate("/");
      return;
    }
    if(!checkPasswordValid(formData.get("password"))){
      setError("Password must be at least 8 characters long and contain at least one uppercase letter.");
      return
    }
    if (formData.get("password") !== formData.get("confirm-password")) {
      setError("The password confirmation does not match.");
      return;
    }
    formData.set("email", localStorage.getItem("email"));
    setError("")
    await axios
      .post(API_ENDPOINT, formData)
      .then((res) => {
        console.log(res);
        localStorage.clear();
        setError(false);
        navigate("/login");
      })
      .catch((err) => {
        setError("The password field is required");
        console.error(err);
        navigate("/");
      });
  };
  return (
    <Container className={styles.container}>
      <Typography color="primary" variant="h5" style={{ fontWeight: "500" }}>
        Create Password
      </Typography>
      <Box component="form" className={styles.form} onSubmit={handleSubmit}>
        <TextField
          type="password"
          size="small"
          label="New Password"
          variant="outlined"
          name="password"
          error={error !== ""}
          fullWidth
        />
        <TextField
          type="password"
          size="small"
          label="Confirm New Password"
          variant="outlined"
          name="confirm-password"
          error={error !== ""}
          helperText={error}
          fullWidth
        />
        <div className={styles.buttons}>
          <Link style={{ textDecoration: "none" }} to={"/login"}>
            <Button fullWidth variant="outlined">
              Cancel
            </Button>
          </Link>
          <Button variant="contained" color="secondary" type="submit">
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
};
