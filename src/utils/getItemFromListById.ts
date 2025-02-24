const getItemFromListById = <T extends { id: string }>(
  data: T[],
  id: string | null
) => {
  if (id === null) {
    throw new Error("getItemFromListById: valid id is required");
  }
  const item = data.find((item) => Number(item.id) === Number(id));

  return item;
};
export default getItemFromListById;
