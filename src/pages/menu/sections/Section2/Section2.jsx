import { Box, Typography } from "@mui/material";
import styles from "./style.module.css";
import { Section } from "components/Section";
export const Section2 = ({ title, description }) => {
  return (
    <Section>
      <Box className={styles.content}>
        <Typography variant="h5" color="primary.dark" marginBottom={2}>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="primary.dark">
          {description}
        </Typography>
      </Box>
    </Section>
  );
};
