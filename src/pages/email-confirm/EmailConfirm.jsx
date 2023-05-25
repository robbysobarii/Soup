import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { Container, Typography } from "@mui/material";
import styles from "./style.module.css";
import { Section } from "components/Section";

export const EmailConfirm = () => {
  return (
    <Container className={styles.container}>
      <MarkEmailUnreadIcon color="primary" style={{ fontSize: "20vh" }} />
      <Typography
        color="primary"
        variant="h5"
        style={{ fontWeight: "500", marginBottom: "10px" }}
      >
        Email Confirmation
      </Typography>
      <Typography
        color="primary"
        align="center"
        style={{ marginBottom: "40px" }}
      >
        An activation link has been sent to your email. <br /> Please click on
        the link in the email to activate your account.
      </Typography>
    </Container>
  );
};
