export const getItemFromListById = <T extends { id: number }>(
  data: T[],
  id: number | null
) => {
  if (id === null) {
    throw new Error("getItemFromListById: valid id is required");
  }
  return data.find((item) => item.id === id);
};
