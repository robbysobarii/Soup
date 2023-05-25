import { Box, Typography, useMediaQuery } from "@mui/material";
import { ReactComponent as CheckedBoxIcon } from "icons/checked-box.svg";
import { ReactComponent as TrashIcon } from "icons/trash.svg";
import { ReactComponent as UncheckedBoxIcon } from "icons/unchecked-box.svg";
import { getFormattedDate } from "utils/getFormattedDate";
import { getFormattedPrice } from "utils/getFormattedPrice";
import { getStaticImage } from "utils/getImageUrl";
import styles from "./style.module.css";

export const MenuList = ({ data, onCheck, isChecked, handleDelete }) => {
  const isMedium = useMediaQuery("(min-width: 600px)");

  return (
    <Box className={styles.container}>
      <Box className={styles.display}>
        <button
          className={isChecked ? styles.checked : styles.unchecked}
          onClick={onCheck}
        >
          {isChecked ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
        </button>
        <Box className={styles.detail}>
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
            <Typography variant="subtitle2" style={{ color: "gray" }}>
              Schedule : {getFormattedDate(new Date(data.schedule))}
            </Typography>
            <Typography variant="h6" color="secondary" fontWeight={600}>
              IDR {getFormattedPrice(data.price)}
            </Typography>
          </Box>
          {!isMedium && (
            <button onClick={handleDelete} className={styles.trashMobile}>
              <TrashIcon />
              <Typography variant="h6">Remove</Typography>
            </button>
          )}
        </Box>
      </Box>
      {isMedium && (
        <button onClick={handleDelete} className={styles.trash}>
          <TrashIcon />
        </button>
      )}
    </Box>
  );
};
