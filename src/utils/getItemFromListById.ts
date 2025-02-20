const getItemFromListById = <T extends { id: string }>(
  data: T[],
  id: number | null
) => {
  if (id === null) {
    throw new Error("getItemFromListById: valid id is required");
  }

  const item = data.find((item) => Number(item.id) === id);
  if (!item) {
    return {name :""}
  }
  return item;
};
export default getItemFromListById;
