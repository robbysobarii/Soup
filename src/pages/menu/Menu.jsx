import axios from "axios";
import { useAsync } from "hooks/useAsync";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { Section1 } from "./sections/Section1";
import { Section2 } from "./sections/Section2";
import { Section3 } from "./sections/Section3";

export const Menu = () => {
  const { slug } = useParams();
  function getSlugDataAsync() {
    return axios.get(`${getApiUrl()}/course-type/get?id=${slug}`);
  }
  function getMenuDataAsync() {
    return axios.get(`${getApiUrl()}/course/get?type_id=${slug}`);
  }
  const {
    execute: executeSlug,
    value: slugValue,
    status: slugStatus,
  } = useAsync(getSlugDataAsync, false);
  const menuData = useAsync(getMenuDataAsync, false);
  useEffect(() => {
    executeSlug();
    menuData.execute();
  }, [slug]);
  return (
    <main>
      <Section1
        imageSrc={
          slugStatus === "success" ? slugValue.data[0].banner_image_url : ""
        }
      />
      <Section2
        title={slugStatus === "success" ? slugValue.data[0].name : ""}
        description={
          slugStatus === "success" ? slugValue.data[0].description : ""
        }
      />
      <Section3 data={menuData} />
    </main>
  );
};
