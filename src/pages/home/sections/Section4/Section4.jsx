import { Box, Typography } from "@mui/material";
import { SectionImage } from "components/SectionImage";
import styles from "./style.module.css";

export const Section4 = () => {
  return (
    <SectionImage
      src="assets/pages/home/section4-backdrop.png"
      alt="section4-backdrop"
      objectPosition="center"
    >
      <Box className={styles.container}>
        <Typography variant="h3" color="primary.light">
          Gets your best benefit
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary.light"
          align="justify"
          className={styles.description}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam.
        </Typography>
      </Box>
    </SectionImage>
  );
};
