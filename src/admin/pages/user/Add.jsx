import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
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

const API_ENDPOINT = `${getApiUrl()}/user/add`;

export const Add = () => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isPassError, setPassError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isChecked, setChecked] = useState(true);
  const navigate = useNavigate();
  const breadcrumbs = [
    {
      name: "User",
      path: "../user",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("status", isChecked);
    if (
      !formData.get("name") ||
      !formData.get("email") ||
      !formData.get("password") ||
      !formData.get("confirm-password")
    ) {
      setSnackbarOpen(true);
      return;
    }
    if (formData.get("password") !== formData.get("confirm-password")) {
      setPassError(true);
      return;
    }
    setPassError(false);
    setEmailError(false);
    await axios
      .post(API_ENDPOINT, formData, getAuthorizedOptions())
      .then((res) => {
        console.log(res);
        navigate("../user");
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data === "Email is already used.") {
          setEmailError(true);
        } else {
          navigate("/");
        }
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
        Add User
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <InputLabel id="select-label">Role</InputLabel>
        <Select
          labelId="select-label"
          name="role"
          id="select"
          label="Role"
          defaultValue="user"
          fullWidth
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
        </Select>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          label="Name"
          name="name"
        />
        <TextField
          fullWidth
          margin="normal"
          id="email"
          label="Email"
          name="email"
          type="email"
          error={isEmailError}
          helperText={isEmailError && "Email is already used."}
        />
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label="Password"
          name="password"
          type="password"
          error={isPassError}
        />
        <TextField
          fullWidth
          margin="normal"
          name="confirm-password"
          id="confirm-password"
          label="Confirm Password"
          type="password"
          error={isPassError}
          helperText={
            isPassError && "The password confirmation does not match."
          }
        />
        <Typography marginTop={1} variant="h6" color="primary">
          Status ( {isChecked ? "Active" : "Inactive"} )
        </Typography>
        <Switch
          name="status"
          checked={isChecked}
          onChange={() => setChecked(!isChecked)}
          disabled
        />
        <Button type="primary" fullWidth variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
