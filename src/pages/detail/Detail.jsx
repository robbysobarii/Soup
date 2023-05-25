import { menuClass } from "mockData";
import { useParams } from "react-router-dom";
import { Section1 } from "./sections/Section1";
import { Section2 } from "./sections/Section2";
import { Section3 } from "./sections/Section3";
import axios from "axios";
import { useAsync } from "hooks/useAsync";
import { useEffect } from "react";
import { getApiUrl } from "utils/getApiUrl";

export const Detail = () => {
  const { slug } = useParams();
  function getSlugDataAsync() {
    return axios.get(`${getApiUrl()}/course/get?id=${slug}`);
  }
  const slugData = useAsync(getSlugDataAsync, false);
  useEffect(() => {
    slugData.execute();
  }, [slug]);
  return (
    <main>
      <Section1 data={slugData} />
      {slugData.status === "success" && (
        <>
          <Section2 description={slugData.value.data[0].description} />
          <Section3 courseId={slug} typeId={slugData.value.data[0].type_id} />
        </>
      )}
    </main>
  );
};
