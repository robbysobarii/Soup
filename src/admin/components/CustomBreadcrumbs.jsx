import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const CustomBreadcrumbs = ({ breadcrumbs, name }) => {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      <MuiLink
        component={Link}
        underline="hover"
        color="inherit"
        to="/admin/dashboard"
        variant="subtitle1"
        fontWeight={500}
      >
        Dashboard
      </MuiLink>
      {breadcrumbs &&
        breadcrumbs.map((item) => (
          <MuiLink
            key={item.name}
            component={Link}
            underline="hover"
            color="inherit"
            to={item.path}
            variant="subtitle1"
            fontWeight={500}
          >
            {item.name}
          </MuiLink>
        ))}
      <Typography variant="subtitle1" fontWeight={500} color="primary">
        {name}
      </Typography>
    </Breadcrumbs>
  );
};
