import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Section } from "components/Section";
import { useAsync } from "hooks/useAsync";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { MenuList } from "./components/MenuList";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "contexts";

const API_ENDPOINT = `${getApiUrl()}/class/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT, getAuthorizedOptions());
}

export const MyClass = () => {
  const { value, status, error } = useAsync(getDataAsync);
  const { setLoggedIn } = useContext(LoginContext);

  if (status === "error") {
    console.error(error);
    setLoggedIn(false);
  }

  return status === "success" && value.data.length ? (
    <Section className={styles.section}>
      <Box className={styles.content}>
        {status === "success" && (
          <Box className={styles.list}>
            {value.data.map((item) => (
              <MenuList key={item.id} data={item} />
            ))}
          </Box>
        )}
      </Box>
    </Section>
  ) : (
    <Section>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          gap: "20px",
        }}
      >
        <DinnerDiningIcon color="primary" style={{ fontSize: "20vh" }} />
        <Typography variant="h2" color="primary" style={{ fontSize: "5vh" }}>
          Your class is empty
        </Typography>
        <Typography
          variant="subtitle2"
          color="primary"
          paddingX={10}
          align="center"
        >
          Looks like you have not order any class.
        </Typography>
      </Box>
    </Section>
  );
};
