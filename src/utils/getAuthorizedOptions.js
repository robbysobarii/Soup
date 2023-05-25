export const getAuthorizedOptions = () => {
  const token = localStorage.getItem("token");
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`.replace(/"/g, ""),
    },
  };

  return authOptions;
};
