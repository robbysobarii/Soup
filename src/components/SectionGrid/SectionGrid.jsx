import { Box, Grid, Skeleton, Typography } from "@mui/material";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { getImageUrl, getStaticImage } from "utils/getImageUrl";
import { getFormattedPrice } from "utils/getFormattedPrice";

export const SectionGrid = ({ title, gridData, filterId }) => {
  const { value, status } = gridData;
  return (
    <Box className={styles.box}>
      <Typography align="center" variant="h4" color="primary">
        {title}
      </Typography>
      <Grid
        container
        columnSpacing={{ xs: 2, sm: 4 }}
        rowGap={{ xs: 4, md: 6 }}
        marginBlock={10}
        className={styles.gridContainer}
      >
        {status === "success"
          ? value.data
              .filter((item) => item.id != filterId)
              .map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4}>
                  <Link to={`/detail/${item.id}`} className={styles.gridItem}>
                    <img src={getStaticImage(item.image_url)} alt={item.name} />
                    <Typography
                      align="left"
                      variant="subtitle2"
                      color="primary"
                      className={styles.type}
                    >
                      {item.type_name}
                    </Typography>
                    <Typography
                      align="left"
                      variant="h5"
                      color="primary"
                      className={styles.name}
                    >
                      {item.name}
                    </Typography>
                    <Typography align="left" variant="h6" color="secondary">
                      IDR {getFormattedPrice(item.price ?? "")}
                    </Typography>
                  </Link>
                </Grid>
              ))
          : new Array(6).fill().map((_, idx) => (
              <Grid key={idx} item xs={12} sm={6} md={4}>
                <Skeleton variant="rounded" width={"100%"} height={300} />
                <Skeleton key={idx} variant="text" width={"100%"} height={50} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

//   <Grid
//     container
//     columnSpacing={{ xs: 2, sm: 4 }}
//     rowGap={{ xs: 4, md: 6 }}
//     marginBlock={10}
//     className={styles.gridContainer}
//   >
//     {dataArray.map((item) => (
//       <Grid key={item.id} item xs={12} sm={6} md={4}>
//         <Link to={`/detail/${item.id}`} className={styles.gridItem}>
//           <img src={getStaticImage(item.image_url)} alt={item.name} />
//           <Typography
//             align="left"
//             variant="subtitle2"
//             color="primary"
//             className={styles.type}
//           >
//             {item.type_name}
//           </Typography>
//           <Typography
//             align="left"
//             variant="h5"
//             color="primary"
//             className={styles.name}
//           >
//             {item.name}
//           </Typography>
//           <Typography align="left" variant="h6" color="secondary">
//             IDR {getFormattedPrice(item.price ?? '')}
//           </Typography>
//         </Link>
//       </Grid>
//     ))}
//   </Grid>
