import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import { CustomBreadcrumbs } from "admin/components/CustomBreadcrumbs";
import axios from "axios";
import { useAsync } from "hooks/useAsync";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getStorageImage } from "utils/getImageUrl";

export const Edit = () => {
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  function asyncFunction() {
    return axios.get(
      `${getApiUrl()}/payment-method/get?id=${slug}`,
      getAuthorizedOptions()
    );
  }
  const { execute, value, status } = useAsync(asyncFunction, false);

  const breadcrumbs = [
    {
      name: "Payment Method",
      path: "../payment-method",
    },
  ];

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("status", formData.get("status") != null);
    if (!formData.get("name")) {
      setNameError("Name can't be empty.");
      return;
    }
    await axios
      .put(
        `${getApiUrl()}/payment-method/edit?id=${slug}`,
        formData,
        getAuthorizedOptions()
      )
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
      <CustomBreadcrumbs name={"Edit"} breadcrumbs={breadcrumbs} />
      <Typography
        variant="h6"
        color="primary"
        style={{ paddingBlock: "20px" }}
        fontWeight={600}
      >
        Edit Payment Method
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        {status === "success" && (
          <TextField
            fullWidth
            margin="normal"
            id="name"
            label="Name"
            name="name"
            focused
            error={nameError}
            helperText={nameError}
            defaultValue={formOldValue.name}
          />
        )}
        <Typography marginTop={1} variant="h6" color="primary">
          Logo
        </Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={getStorageImage(formOldValue.logo_url)}
            alt=""
            width={60}
            height={60}
          />
          <input
            style={{ marginBlock: 10, paddingBlock: 10 }}
            name="logo"
            accept="image/*"
            multiple
            type="file"
          />
        </div>
        {status === "success" && (
          <>
            <Typography marginTop={1} variant="h6" color="primary">
              Status ( {isChecked ? "Active" : "Inactive"} )
            </Typography>
            <Switch
              name="status"
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
