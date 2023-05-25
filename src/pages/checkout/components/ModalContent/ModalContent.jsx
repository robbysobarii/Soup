import {
  Alert,
  Box,
  Button,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAsync } from "hooks/useAsync";
import React, { useState } from "react";
import { getApiUrl } from "utils/getApiUrl";
import { getStorageImage } from "utils/getImageUrl";
import styles from "./style.module.css";

const API_ENDPOINT = `${getApiUrl()}/payment-method/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT);
}

export const ModalContent = React.forwardRef(({ onSubmit, onCancel }, ref) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { value, status } = useAsync(getDataAsync);
  const [activePayment, setActivePayment] = useState("");
  return (
    <Box className={styles.container}>
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
          Please select payment method!
        </Alert>
      </Snackbar>
      <Typography align="center" variant="h5" color="primary" fontWeight={500}>
        Select Payment Method
      </Typography>
      <Box className={styles.paymentBox}>
        {status === "success"
          ? value.data.map((item) => (
              <Box
                key={item.id}
                style={{
                  backgroundColor: activePayment === item.id && "lightgray",
                }}
                className={styles.paymentList}
                onClick={() => setActivePayment(item.id)}
              >
                <img
                  width={40}
                  height={40}
                  src={getStorageImage(item.logo_url)}
                  alt={item.name}
                />
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight={500}
                >
                  {item.name}
                </Typography>
              </Box>
            ))
          : new Array(4).fill().map((_, idx) => (
              <Box key={idx} className={styles.paymentList}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  style={{ flexShrink: 0 }}
                />
                <Skeleton variant="text" width={"100%"} height={30} />
              </Box>
            ))}
      </Box>
      <Box className={styles.buttons}>
        <Button onClick={onCancel} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ flexShrink: 0 }}
          onClick={() => {
            if (activePayment) {
              setSnackbarOpen(false);
              onSubmit();
              return;
            }
            setSnackbarOpen(true);
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
  );
});
