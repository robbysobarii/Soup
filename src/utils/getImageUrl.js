export const getImageUrl = (url) => {
  return `/${url}`;
};

export const getStaticImage = (url) => {
  return `${process.env.REACT_APP_API_URL}/static/${url}`;
};

export const getStorageImage = (url) => {
  return `${process.env.REACT_APP_API_URL}/storage/${url}`;
};
