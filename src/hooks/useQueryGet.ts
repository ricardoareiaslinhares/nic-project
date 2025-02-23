import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

type Props<T, TSelected = T> = {
  getFn: () => Promise<T[]>;
  queryKey: string;
} & Omit<UseQueryOptions<T[], unknown, TSelected>, "queryKey" | "queryFn">;

const useQueryGet = <T, TSelected>({
  getFn,
  queryKey,
  ...rest
}: Props<T, TSelected>) => {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => getFn(),
    ...rest,
  });
};

export default useQueryGet;
