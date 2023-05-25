import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Section } from "components/Section";
import { CheckoutContext, LoginContext } from "contexts";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getFormattedDate } from "utils/getFormattedDate";
import { getFormattedPrice } from "utils/getFormattedPrice";
import { getStaticImage } from "utils/getImageUrl";
import styles from "./style.module.css";
import axios from "axios";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";

const API_ENDPOINT = `${getApiUrl()}/checkout/add`;

export const Section1 = ({ data }) => {
  const { slug } = useParams();
  const { value, status } = data;
  const [schedule, setSchedule] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [isError, setError] = useState(false);
  const { isUser } = useContext(LoginContext);
  const { getCheckoutCount } = useContext(CheckoutContext);
  const navigate = useNavigate();

  const generateDate = () => {
    const today = new Date();
    const dateArray = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dateArray.push(getFormattedDate(date));
    }
    return dateArray;
  };

  const sectionData = status === "success" ? value.data[0] : {};

  const handleAddToCart = async () => {
    if (isUser) {
      setSnackbarOpen(true);
      if (schedule) {
        const formData = new FormData();
        formData.set("schedule", new Date(schedule).toLocaleDateString());
        formData.set("course_id", slug);
        await axios
          .post(API_ENDPOINT, formData, getAuthorizedOptions())
          .then((res) => {
            getCheckoutCount();
            setError(false);
          })
          .catch((err) => {
            console.error(err);
            if (err.response.data === "Course already added") {
              setError(true);
            } else {
              navigate("/");
            }
          });
      }
    } else {
      navigate("/login");
    }
  };

  const handleBuyNow = async () => {
    if (isUser) {
      setSnackbarOpen(true);
      if (schedule) {
        const formData = new FormData();
        formData.set("schedule", new Date(schedule).toLocaleDateString());
        formData.set("course_id", slug);
        await axios
          .post(API_ENDPOINT, formData, getAuthorizedOptions())
          .then((res) => {
            getCheckoutCount();
            navigate("/checkout");
            setError(false);
          })
          .catch((err) => {
            console.error(err);
            if (err.response.data === "Course already added") {
              setError(true);
            } else {
              navigate("/");
            }
          });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Section>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={schedule && !isError ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {!schedule && "Please select schedule!"}
          {isError && "Course already added. Please select other schedule."}
          {schedule && !isError && "Course added to chart!"}
        </Alert>
      </Snackbar>
      {status === "success" ? (
        <Box className={styles.container}>
          <img
            src={getStaticImage(sectionData.image_url)}
            alt={sectionData.name}
            className={styles.image}
          />
          <Box className={styles.content}>
            <div className={styles.details}>
              <Typography variant="subtitle2" style={{ color: "gray" }}>
                {sectionData.type_name}
              </Typography>
              <Typography variant="h5" color="primary.dark">
                {sectionData.name}
              </Typography>
              <Typography variant="h5" color="primary">
                IDR {getFormattedPrice(sectionData.price)}
              </Typography>
            </div>
            <Box className={styles.selectContainer}>
              <FormControl className={styles.selectContainer} size="small">
                <InputLabel id="schedule-input">Select Schedule</InputLabel>
                <Select
                  labelId="schedule-input"
                  id="schedule-input"
                  value={schedule}
                  label="Select Schedule"
                  error={isSnackbarOpen && !schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  {generateDate().map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box className={styles.buttons}>
              <Button
                color="primary"
                variant="outlined"
                className={styles.button}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={styles.button}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={styles.container}>
          <Skeleton
            variant="rounded"
            className={styles.imageSkeleton}
            height={250}
          />
          <div style={{ width: "100%" }}>
            <Skeleton variant="text" width={"80%"} height={50} />
            <Skeleton variant="text" width={"60%"} height={50} />
            <Skeleton variant="text" width={"100%"} height={50} />
            <Skeleton variant="text" width={"20%"} height={50} />
            <Skeleton variant="text" width={"50%"} height={50} />
          </div>
        </Box>
      )}
    </Section>
  );
};
