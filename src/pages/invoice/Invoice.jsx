import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Breadcrumbs,
  Button,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Section } from "components/Section";
import { useAsync } from "hooks/useAsync";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getFormattedPrice } from "utils/getFormattedPrice";
import styles from "./style.module.css";
import { getSimpleDate } from "utils/getFormattedDate";
import { useContext } from "react";
import { LoginContext } from "contexts";

const API_ENDPOINT = `${getApiUrl()}/invoice/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT, getAuthorizedOptions());
}

export const Invoice = () => {
  const { value, status, error } = useAsync(getDataAsync);
  const { setLoggedIn } = useContext(LoginContext);

  if (status === "error") {
    console.error(error);
    setLoggedIn(false);
  }
  return (
    <Section className={styles.section}>
      <Box className={styles.container}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <MuiLink
            component={Link}
            underline="hover"
            color="inherit"
            to="/"
            variant="subtitle1"
            fontWeight={500}
          >
            Home
          </MuiLink>
          <Typography variant="subtitle1" fontWeight={500} color="primary">
            Invoice
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h6"
          color="primary"
          style={{ paddingBlock: "20px" }}
          fontWeight={600}
        >
          Menu Invoice
        </Typography>
        <TableContainer>
          <Table>
            {status === "success" && value.data.length === 0 && (
              <caption style={{ textAlign: "center" }}>
                There is no invoice available right now
              </caption>
            )}
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">No. Invoice</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Total Course</TableCell>
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            {status === "success" && (
              <TableBody>
                {value.data.map((data, idx) => (
                  <TableRow key={data.id} className={styles.tableRow}>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell align="center">{data.receipt_name}</TableCell>
                    <TableCell align="center">
                      {getSimpleDate(data.date)}
                    </TableCell>
                    <TableCell align="center">{data.total}</TableCell>
                    <TableCell align="center">
                      IDR {getFormattedPrice(data.total_price)}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/invoice/detail/${data.receipt_name}`}
                      >
                        <Button variant="contained" color="secondary">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Section>
  );
};
