import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useAsync } from "hooks/useAsync";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";

export const Verify = () => {
  const { slug } = useParams();
  const asyncFunction = () => {
    return axios.get(`${getApiUrl()}/user-auth/verify?token=${slug}`);
  };
  const { value, status, error, execute } = useAsync(asyncFunction, false);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle"){
      execute();
    }
    if (status === "success") {
      console.log("success", value);
      navigate("/email-confirm-success");
    }
    if (status === "error") {
      console.log("error", error);
      navigate("/");
    }
  }, [status, value, navigate, error]);

  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" color="primary">
        Verifying...
      </Typography>
    </div>
  );
};
