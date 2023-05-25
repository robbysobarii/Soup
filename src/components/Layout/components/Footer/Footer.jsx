import { Box, Grid, Typography } from "@mui/material";
import styles from "./style.module.css";
import { ReactComponent as PhoneIcon } from "icons/phone.svg";
import { ReactComponent as InstagramIcon } from "icons/instagram.svg";
import { ReactComponent as YoutubeIcon } from "icons/youtube.svg";
import { ReactComponent as TelegramIcon } from "icons/telegram.svg";
import { ReactComponent as EmailIcon } from "icons/email.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getApiUrl } from "utils/getApiUrl";
import { useAsync } from "hooks/useAsync";
import axios from "axios";
import { Link } from "react-router-dom";

const API_ENDPOINT = `${getApiUrl()}/course-type/get`;

const asyncFunction = () => {
  return axios.get(API_ENDPOINT);
};

export const Footer = () => {
  const { value, status } = useAsync(asyncFunction);
  const isMedium = useMediaQuery("(min-width: 900px)");
  return (
    <footer className={styles.footer}>
      <Grid
        container
        className={styles.container}
        justifyContent="space-between"
      >
        <Grid item md={4}>
          <Typography
            variant="subtitle1"
            color="secondary"
            className={styles.title}
          >
            About Us
          </Typography>
          <Typography variant="subtitle2" align="justify" color="primary.light">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Typography>
        </Grid>
        <Grid item md={3.2} marginLeft={isMedium && "auto"}>
          <Typography
            variant="subtitle1"
            color="secondary"
            className={styles.title}
          >
            Product
          </Typography>
          <Typography
            component="div"
            variant="subtitle2"
            align="justify"
            color="primary.light"
          >
            {status === "success" && (
              <ul className={styles.list}>
                {value.data.map((item) => (
                  <Link key={item.id} to={`/menu/${item.id}`}>
                    <li>{item.name}</li>
                  </Link>
                ))}
              </ul>
            )}
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            variant="subtitle1"
            color="secondary"
            className={styles.title}
          >
            Address
          </Typography>
          <Typography variant="subtitle2" align="justify" color="primary.light">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque.
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary"
            className={styles.title}
            marginTop={2}
          >
            Contact Us
          </Typography>
          <Box className={styles.socials}>
            <a href="https://www.google.com/" className={styles.socialLink}>
              <PhoneIcon />
            </a>
            <a href="https://www.instagram.com/" className={styles.socialLink}>
              <InstagramIcon />
            </a>
            <a href="https://www.youtube.com/" className={styles.socialLink}>
              <YoutubeIcon />
            </a>
            <a href="https://web.telegram.org/" className={styles.socialLink}>
              <TelegramIcon />
            </a>
            <a href="https://www.gmail.com/" className={styles.socialLink}>
              <EmailIcon />
            </a>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};
