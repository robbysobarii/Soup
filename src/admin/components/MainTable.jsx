import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CustomBreadcrumbs } from "admin/components/CustomBreadcrumbs";
import { useAsync } from "hooks/useAsync";
import { ReactComponent as LoadingIcon } from "icons/loading.svg";
import { Link } from "react-router-dom";

export const MainTable = ({
  title,
  notEditable,
  tableHeaders,
  makeTableRows,
  getDataAsync,
}) => {
  const { status, value, error } = useAsync(getDataAsync, true);
  return (
    <Box>
      {!notEditable && <CustomBreadcrumbs name={title} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          style={{ paddingBlock: "20px" }}
          fontWeight={600}
        >
          {title}
        </Typography>
        {!notEditable && (
          <Link style={{ textDecoration: "none" }} to={"add"}>
            <Button variant="contained" color="primary">
              <AddIcon style={{ marginRight: 5 }} /> Tambah
            </Button>
          </Link>
        )}
      </div>
      {status === "loading" && (
        <Typography variant="subtitle2" color="primary">
          <LoadingIcon />
        </Typography>
      )}
      {status === "success" && (
        <TableContainer>
          <Table>
            {value.data.length === 0 && (
              <caption style={{ textAlign: "center" }}>
                There is no data available
              </caption>
            )}
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header} align="center">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{makeTableRows(value.data)}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
