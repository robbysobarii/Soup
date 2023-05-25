import { SectionImage } from "components/SectionImage";
import { getStaticImage } from "utils/getImageUrl";
import styles from "./style.module.css";

export const Section1 = ({ imageSrc }) => {
  return (
    <SectionImage
      src={getStaticImage(imageSrc)}
      alt="banner"
      objectPosition="center"
      className={styles.banner}
    />
  );
};
