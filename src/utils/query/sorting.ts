export const getSorting = (
  sort?: string,
  order?: string
) => {
  return {
    [sort || "createdAt"]:
      order === "asc"
        ? "asc"
        : "desc"
  };
};