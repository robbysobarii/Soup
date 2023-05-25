import { Box, Grid, Typography } from "@mui/material";
import styles from "./style.module.css";
import { Section } from "components/Section";
import CountUp from "react-countup";
import axios from "axios";
import { getApiUrl } from "utils/getApiUrl";
import { useAsync } from "hooks/useAsync";

const getCourseCount = async () => {
  return Promise.all([
    axios.get(
      `${getApiUrl()}/course/get-count`,
    ),
    axios.get(
      `${getApiUrl()}/course-type/get-count`,
    ),
  ])
}

export const Section2 = () => {
  const {value, status} = useAsync(getCourseCount)
  return (
    <Section className={styles.body}>
      <Box className={styles.container}>
        <Grid
          container
          className={styles.gridContainer}
          columnSpacing={{ xs: 0, md: 5 }}
          rowGap={{ xs: 0, md: 6 }}
          marginBlock={10}
        >
          <Grid item xs={12} sm={3} className={styles.item}>
            <Typography
              align="center"
              variant="h3"
              color="secondary"
              className={styles.head}
            >
              {/* {status === "success" ? <CountUp end={value[0].data} duration={5}/> : 0}+ */}
              <CountUp end={200} duration={5}/>+
            </Typography>
            <Typography align="center" variant="subtitle1" color="primary">
              Various cuisines available in professional class
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} className={styles.item}>
            <Typography
              align="center"
              variant="h3"
              color="secondary"
              className={styles.head}
            >
              {/* {status === "success" ? <CountUp end={value[1].data} duration={5}/> : 0}+ */}
              <CountUp end={50} duration={5}/>+
            </Typography>
            <Typography align="center" variant="subtitle1" color="primary">
              A chef who is reliable and has his own characteristics in cooking
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} className={styles.item}>
            <Typography
              align="center"
              variant="h3"
              color="secondary"
              className={styles.head}
            >
              {/* {status === "success" ? <CountUp end={30} duration={5}/> : 0}+ */}
              <CountUp end={30} duration={5}/>+
            </Typography>
            <Typography align="center" variant="subtitle1" color="primary">
              Cooperate with trusted and upscale restaurants
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
};
