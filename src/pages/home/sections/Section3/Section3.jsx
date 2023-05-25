import { Section } from "components/Section";
import styles from "./style.module.css";
import { menuClass } from "mockData";
import { SectionGrid } from "components/SectionGrid";
import { useAsync } from "hooks/useAsync";
import axios from "axios";
import { getApiUrl } from "utils/getApiUrl";

const API_ENDPOINT = `${getApiUrl()}/course/get?count=6`;

function getDataAsync() {
  return axios.get(API_ENDPOINT);
}

export const Section3 = () => {
  const gridData = useAsync(getDataAsync);
  return (
    <Section className={styles.container}>
      <SectionGrid gridData={gridData} title="More professional class" />
    </Section>
  );
};
