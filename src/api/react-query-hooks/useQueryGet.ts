import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Props<T, TSelected = T[]> = {
  getFn: (userId?: number) => Promise<T[]>;
  queryKey: string | string[] | number[];
  userId?: number;
} & Omit<UseQueryOptions<T[], unknown, TSelected>, "queryKey" | "queryFn">;

export const useQueryGet = <T, TSelected = T[]>({
  getFn,
  queryKey,
  userId,
  ...rest
}: Props<T, TSelected>) => {
  // const queryClient = useQueryClient();
  let queryKeyA = Array.isArray(queryKey) ? queryKey : [queryKey];
  return useQuery({
    queryKey: [...queryKeyA],
    queryFn: userId ? () => getFn(userId) : () => getFn(),
    ...rest,
  });
};

export default useQueryGet;
