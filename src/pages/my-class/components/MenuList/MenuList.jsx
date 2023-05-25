import { Box, Typography } from "@mui/material";
import { getFormattedDate } from "utils/getFormattedDate";
import { getStaticImage } from "utils/getImageUrl";
import styles from "./style.module.css";

export const MenuList = ({ data }) => {
  return (
    <Box className={styles.container}>
      <img
        src={getStaticImage(data.image_url)}
        alt="detail"
        className={styles.image}
      />
      <Box className={styles.content}>
        <Typography variant="subtitle2" style={{ color: "gray" }}>
          {data.type_name}
        </Typography>
        <Typography variant="h5" color="primary.dark">
          {data.name}
        </Typography>
        <Typography variant="h6" color="secondary">
          Schedule : {getFormattedDate(new Date(data.schedule))}
        </Typography>
      </Box>
    </Box>
  );
};
