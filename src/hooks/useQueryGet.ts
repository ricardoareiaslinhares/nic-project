import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props<T> = {
    getFn: () => Promise<T[]>;
    queryKey: string
}

const useQueryGet = <T,>({ getFn, queryKey }: Props<T>) => {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: [queryKey],
        queryFn: () => getFn(),

    });
}

export default useQueryGet