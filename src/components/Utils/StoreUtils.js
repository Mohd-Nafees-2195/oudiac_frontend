export const getActiveStores = (stores) => {
  if (!Array.isArray(stores)) {
    return [];
  }

  return stores.filter(
    (store) => store?.storeStatus?.toUpperCase() === "ACTIVE",
  );
};

export const filterByDate = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date)) return "Invalid Date";

  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");
};

export const filterByDateAndTime = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
