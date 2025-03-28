export const formateDate = (date: string | null): string => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};
