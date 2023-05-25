import { Section } from "components/Section";
import styles from "./style.module.css";
import { SectionGrid } from "components/SectionGrid";

export const Section3 = ({ data }) => {
  return (
    <Section className={styles.container}>
      <SectionGrid gridData={data} title="Another menu in this class" />
    </Section>
  );
};
