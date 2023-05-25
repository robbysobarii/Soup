export const getApiUrl = () => {
  // handle development and production env
  return `${process.env.REACT_APP_API_URL}/api`;
};
