import { Box, Grid, Typography } from "@mui/material";
import { Section } from "components/Section";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { menuTypes } from "mockData";
import { useAsync } from "hooks/useAsync";
import { getApiUrl } from "utils/getApiUrl";
import axios from "axios";
import { getStaticImage } from "utils/getImageUrl";

const API_ENDPOINT = `${getApiUrl()}/course-type/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT);
}

export const Section5 = () => {
  const { value, status, error } = useAsync(getDataAsync);
  return (
    <Section>
      <Box className={styles.container}>
        <Typography align="center" variant="h4" color="primary">
          More food type as you can choose
        </Typography>
        <Grid
          container
          columnSpacing={{ xs: 2, md: 2 }}
          rowGap={{ xs: 4, md: 6 }}
          marginBlock={10}
        >
          {(status === "success" ? value.data : []).map((item) => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <Link to={`/menu/${item.id}`} className={styles.gridItem}>
                <img src={getStaticImage(item.image_url)} alt={item.name} />
                <Typography align="center" variant="h6" color="primary">
                  {item.name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Section>
  );
};
