import { Button, Chip, TableCell, TableRow } from "@mui/material";
import { MainTable } from "admin/components/MainTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";

const API_ENDPOINT = `${getApiUrl()}/user/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT, getAuthorizedOptions());
}

export const User = () => {
  const tableHeaders = ["Id", "Role", "Name", "Email", "Status", "Action"];
  return (
    <MainTable
      title={"User"}
      tableHeaders={tableHeaders}
      getDataAsync={getDataAsync}
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
            <TableCell align="center">
              <Link style={{ textDecoration: "none" }} to={`edit/${item.id}`}>
                <Button variant="contained" color="secondary">
                  Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))
      }
    />
  );
};
