import { Section } from "components/Section";
import styles from "./style.module.css";
import { SectionGrid } from "components/SectionGrid";
import { useEffect } from "react";
import { useAsync } from "hooks/useAsync";
import axios from "axios";
import { getApiUrl } from "utils/getApiUrl";

export const Section3 = ({ courseId, typeId }) => {
  function getMenuDataAsync() {
    return axios.get(`${getApiUrl()}/course/get?type_id=${typeId}`);
  }
  const menuData = useAsync(getMenuDataAsync, false);
  useEffect(() => {
    menuData.execute();
  }, []);
  return (
    <Section className={styles.container}>
      <SectionGrid
        filterId={courseId}
        gridData={menuData}
        title="Another menu in this class"
      />
    </Section>
  );
};
