import { Box, Typography } from "@mui/material";
import { SectionImage } from "components/SectionImage";
import styles from "./style.module.css";

export const Section1 = () => {
  return (
    <SectionImage
      src="assets/pages/home/banner.png"
      alt="banner"
      objectPosition="bottom"
    >
      <Box className={styles.container}>
        <Typography variant="h4" color="primary.light" align="center">
          Be the next great chef
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="center"
          className={styles.caption}
        >
          We are able to awaken your cooking skills to become a classy chef and{" "}
          <br />
          ready to dive into the professional world
        </Typography>
      </Box>
    </SectionImage>
  );
};
