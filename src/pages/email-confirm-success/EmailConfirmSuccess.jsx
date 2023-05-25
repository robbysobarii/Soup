import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export const EmailConfirmSuccess = () => {
  return (
    <Container className={styles.container}>
      <img
        src="assets/pages/success/success.png"
        alt="Success"
        loading="lazy"
      />
      <Typography
        color="primary"
        variant="h5"
        style={{ fontWeight: "500", marginBottom: "10px" }}
      >
        Email Confirmation Success
      </Typography>
      <Typography
        color="primary"
        align="center"
        style={{ marginBottom: "40px" }}
      >
        Congratulations! your email has already used.
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Link style={{ textDecoration: "none" }} to={"/login"}>
          <Button variant="contained" color="secondary">
            Login Here
          </Button>
        </Link>
      </div>
    </Container>
  );
};
