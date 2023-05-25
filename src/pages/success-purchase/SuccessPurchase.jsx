import { Button, Container, Typography } from "@mui/material";
import { ReactComponent as Arrows } from "icons/arrows.svg";
import { ReactComponent as Home } from "icons/home.svg";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

export const SuccessPurchase = () => {
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
        Purchase Successfully
      </Typography>
      <Typography
        color="primary"
        align="center"
        style={{ marginBottom: "40px" }}
      >
        Horay!! Let’s cook and become a professional cheff
      </Typography>
      <div className={styles.buttons}>
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#5B4947",
              border: "1px solid #5B4947",
            }}
          >
            <Home className={styles.Home} />
            Back Home
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/invoice"}>
          <Button variant="contained" color="secondary">
            <Arrows className={styles.Arrows} />
            Open Invoice
          </Button>
        </Link>
      </div>
    </Container>
  );
};
