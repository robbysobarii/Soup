import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "utils/getImageUrl";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#5B4947",
      }}
    >
      <Typography variant="h1" color="secondary" fontSize={"10vw"}>
        404
      </Typography>
      <Typography variant="h3" color="primary.light" fontSize={"2vw"}>
        PAGE NOT FOUND
      </Typography>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
    </Box>
  );
};
