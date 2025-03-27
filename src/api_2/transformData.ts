export const extractIdFromRoute = (route: string): string | null => {
  const match = route.match(/\/([^\/]+)$/);
  return match ? match[1] : null;
};
