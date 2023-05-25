export const getFormattedDate = (date) => {
  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return `${dateString}, ${date.getFullYear()}`;
};

export const getSimpleDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
