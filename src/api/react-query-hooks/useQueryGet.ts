import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Props<T> = {
  getFn: (userId?: number) => Promise<T[]>;
  queryKey: string | string[] | number[];
  userId?: number;
} & Omit<UseQueryOptions<T[], unknown>, "queryKey" | "queryFn">;

export const useQueryGet = <T>({
  getFn,
  queryKey,

  userId,
  ...rest
}: Props<T>) => {
  let queryKeyA = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useQuery({
    queryKey: [...queryKeyA],
    queryFn: () => (userId ? getFn(userId) : getFn()),
    ...rest,
  });
};

export default useQueryGet;
