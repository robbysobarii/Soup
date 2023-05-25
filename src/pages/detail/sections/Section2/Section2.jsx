import { Box, Typography } from "@mui/material";
import { Section } from "components/Section";
import styles from "./style.module.css";
export const Section2 = ({ description }) => {
  return (
    <Section>
      <Box className={styles.content}>
        <Typography variant="h5" color="primary.dark" marginBottom={2}>
          Description
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary.dark"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Box>
    </Section>
  );
};
