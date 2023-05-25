import {
  Button,
  Card,
  Chip,
  Container,
  TableCell,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { MainTable } from "admin/components/MainTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getStorageImage } from "utils/getImageUrl";
import { getParamFromJwt } from "utils/getParamFromJwt";

const API_USER_ENDPOINT = `${getApiUrl()}/user/get`;
const API_PAYMENT_ENDPOINT = `${getApiUrl()}/payment-method/get`;

function getUserDataAsync() {
  return axios.get(API_USER_ENDPOINT, getAuthorizedOptions());
}

function getPaymentDataAsync() {
  return axios.get(API_PAYMENT_ENDPOINT, getAuthorizedOptions());
}

export const AdminDashboard = () => {
  const tableUserHeaders = ["Id", "Role", "Name", "Email", "Status"];
  const tablePaymentHeaders = ["Id", "Name", "Logo", "Status"];
  return (
    <Container
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Typography variant="h4" color="primary">
        Welcome Back, {getParamFromJwt(localStorage.getItem("token"), "name")}!
      </Typography>
      <Card
        variant="outlined"
        style={{ paddingInline: "20px", paddingBottom: "20px" }}
      >
        <MainTable
          title={"User"}
          tableHeaders={tableUserHeaders}
          getDataAsync={getUserDataAsync}
          notEditable
          makeTableRows={(data) =>
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.role}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.status ? "Active" : "Inactive"}
                    color={item.status ? "success" : "error"}
                  />
                </TableCell>
              </TableRow>
            ))
          }
        />
      </Card>
      <Card
        variant="outlined"
        style={{ paddingInline: "20px", paddingBottom: "20px" }}
      >
        <MainTable
          title={"Payment Method"}
          tableHeaders={tablePaymentHeaders}
          getDataAsync={getPaymentDataAsync}
          notEditable
          makeTableRows={(data) =>
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={getStorageImage(item.logo_url)}
                    alt={item.name}
                    width={40}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={item.status ? "Active" : "Inactive"}
                    color={item.status ? "success" : "error"}
                  />
                </TableCell>
              </TableRow>
            ))
          }
        />
      </Card>
    </Container>
  );
};
