import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { CustomBreadcrumbs } from "admin/components/CustomBreadcrumbs";
import axios from "axios";
import { useAsync } from "hooks/useAsync";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getParamFromJwt } from "utils/getParamFromJwt";

export const Edit = () => {
  const [isNameError, setNameError] = useState(false);
  const navigate = useNavigate();
  const adminId = getParamFromJwt(localStorage.getItem("token"), "id");
  const { slug } = useParams();
  function asyncFunction() {
    return axios.get(
      `${getApiUrl()}/user/get?id=${slug}`,
      getAuthorizedOptions()
    );
  }
  const { execute, value, status } = useAsync(asyncFunction, false);

  const formOldValue = status === "success" && value.data[0];
  const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            execute();
        }
        if (status === "success") {
            setChecked(formOldValue.status);
        }
    }, [status]);

  const breadcrumbs = [
    {
      name: "User",
      path: "../user",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("status", formData.get("status") != null);
    if (!formData.get("name")) {
      setNameError(true);
      return;
    }
    setNameError(false);
    await axios
      .put(
        `${getApiUrl()}/user/edit?id=${slug}`,
        formData,
        getAuthorizedOptions()
      )
      .then((res) => {
        console.log(res);
        navigate("../user");
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  };
  return (
    <Box>
      <CustomBreadcrumbs name={"Edit"} breadcrumbs={breadcrumbs} />
      <Typography
        variant="h6"
        color="primary"
        style={{ paddingBlock: "20px" }}
        fontWeight={600}
      >
        Edit User
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        {status === "success" && (
          <>
            <InputLabel id="select-label">Role</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              name="role"
              defaultValue={formOldValue.role}
              label="Role"
              disabled={adminId === slug}
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
              error={isNameError}
              defaultValue={formOldValue.name}
              helperText={isNameError && "Name can't be empty."}
            />
          </>
        )}
        {status === "success" && (
          <>
            <Typography marginTop={1} variant="h6" color="primary">
              Status ( {isChecked ? "Active" : "Inactive"} )
            </Typography>
            <Switch
              name="status"
              disabled={adminId === slug}
              onChange={() => setChecked(!isChecked)}
              defaultChecked={formOldValue.status}
            />
          </>
        )}
        <Button type="primary" fullWidth variant="contained" sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
