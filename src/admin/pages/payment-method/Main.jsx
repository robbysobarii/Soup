import { Button, Chip, TableCell, TableRow } from "@mui/material";
import { MainTable } from "admin/components/MainTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getStorageImage } from "utils/getImageUrl";

const API_ENDPOINT = `${getApiUrl()}/payment-method/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT, getAuthorizedOptions());
}

export const PaymentMethod = () => {
  const tableHeaders = ["Id", "Name", "Logo", "Status", "Action"];
  return (
    <MainTable
      title={"Payment Method"}
      tableHeaders={tableHeaders}
      getDataAsync={getDataAsync}
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
