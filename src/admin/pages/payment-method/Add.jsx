import {
  Alert,
  Box,
  Button,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { CustomBreadcrumbs } from "admin/components/CustomBreadcrumbs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";

const API_ENDPOINT = `${getApiUrl()}/payment-method/add`;

export const Add = () => {
  const [nameError, setNameError] = useState("");
  const [isChecked, setChecked] = useState(true);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const breadcrumbs = [
    {
      name: "Payment Method",
      path: "../payment-method",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("status", isChecked);
    setNameError("");
    if (!formData.get("name") || formData.get("logo").size === 0) {
      setSnackbarOpen(true);
      return;
    }
    await axios
      .post(API_ENDPOINT, formData, getAuthorizedOptions())
      .then((res) => {
        console.log(res);
        navigate("../payment-method");
      })
      .catch((err) => {
        console.error(err);
        setNameError(err.response.data);
      });
  };
  return (
    <Box>
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
      <CustomBreadcrumbs name={"Add"} breadcrumbs={breadcrumbs} />
      <Typography
        variant="h6"
        color="primary"
        style={{ paddingBlock: "20px" }}
        fontWeight={600}
      >
        Add Payment Method
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          label="Name"
          name="name"
          error={nameError}
          helperText={nameError}
          autoFocus
        />
        <Typography marginTop={1} variant="h6" color="primary">
          Logo
        </Typography>
        <input
          style={{ marginBlock: 10, paddingBlock: 10 }}
          name="logo"
          accept="image/*"
          multiple
          type="file"
        />
        <Typography marginTop={1} variant="h6" color="primary">
          Status ( {isChecked ? "Active" : "Inactive"} )
        </Typography>
        <Switch
          name="status"
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
        />
        <Button type="primary" fullWidth variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
