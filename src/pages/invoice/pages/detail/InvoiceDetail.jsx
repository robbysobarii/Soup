import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Breadcrumbs,
  Grid,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Section } from "components/Section";
import { invoiceList } from "mockData";
import { Link, useParams } from "react-router-dom";
import { getFormattedPrice } from "utils/getFormattedPrice";
import styles from "./style.module.css";
import { getApiUrl } from "utils/getApiUrl";
import { useAsync } from "hooks/useAsync";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getFormattedDate, getSimpleDate } from "utils/getFormattedDate";

export const InvoiceDetail = () => {
  const { slug } = useParams();
  function getSlugDataAsync() {
    return Promise.all([
      axios.get(
        `${getApiUrl()}/invoice/get?receipt_name=${slug}`,
        getAuthorizedOptions()
      ),
      axios.get(
        `${getApiUrl()}/invoice-detail/get?receipt_name=${slug}`,
        getAuthorizedOptions()
      ),
    ]);
  }
  const { value, status, execute } = useAsync(getSlugDataAsync, false);
  const [invoiceData, setInvoiceData] = useState(null);
  useEffect(() => {
    if (status === "success") {
      const invoiceData = value[0].data[0];
      const detailData = value[1].data;
      setInvoiceData({
        receipt_name: invoiceData.receipt_name,
        date: invoiceData.date,
        total_price: invoiceData.total_price,
        courses: detailData,
      });
    } else {
      execute();
    }
  }, [status]);
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
          <MuiLink
            component={Link}
            underline="hover"
            color="inherit"
            to="/invoice"
            variant="subtitle1"
            fontWeight={500}
          >
            Invoice
          </MuiLink>
          <Typography variant="subtitle1" fontWeight={500} color="primary">
            Details Invoice
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h6"
          color="primary"
          style={{ paddingBlock: "20px" }}
          fontWeight={600}
        >
          Details Invoice
        </Typography>
        {invoiceData && (
          <Box className={styles.detail}>
            <Grid container className={styles.detailContent}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="primary">
                  No. Invoice:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="primary">
                  {invoiceData.receipt_name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="primary">
                  Date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="primary">
                  {getSimpleDate(invoiceData.date)}
                </Typography>
              </Grid>
            </Grid>
            <Typography
              variant="subtitle1"
              color="primary"
              fontWeight={600}
              className={styles.totalPrice}
            >
              <span>Total Price</span>
              IDR {getFormattedPrice(invoiceData.total_price)}
            </Typography>
          </Box>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Course Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Schedule</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            {invoiceData && (
              <TableBody>
                {invoiceData.courses.map((data, idx) => (
                  <TableRow key={data.id} className={styles.tableRow}>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.type}</TableCell>
                    <TableCell align="center">
                      {getFormattedDate(new Date(data.schedule))}
                    </TableCell>
                    <TableCell align="center">
                      IDR {getFormattedPrice(data.price)}
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
