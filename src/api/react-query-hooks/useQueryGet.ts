import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Props<T, TSelected = T[]> = {
  getFn: (userId?: number) => Promise<T[]>;
  queryKey: string;
  userId?: number;
} & Omit<UseQueryOptions<T[], unknown, TSelected>, "queryKey" | "queryFn">;

const useQueryGet = <T, TSelected = T[]>({
  getFn,
  queryKey,
  userId,
  ...rest
}: Props<T, TSelected>) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: [queryKey],
    queryFn: userId ? () => getFn(userId) : () => getFn(),
    ...rest,
  });
};

export default useQueryGet;
