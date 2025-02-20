import { useQuery } from "@tanstack/react-query";

type Props<T> = {
    getByIdFn: (id: number) => Promise<T>
    id: number;
    queryKey: string;
};

const useQueryDetails =<T,> ({getByIdFn, id, queryKey}: Props<T>) => {
   // const queryClient = useQueryClient();
    return useQuery({
        queryKey: [queryKey, id],
        queryFn: () => getByIdFn(id),
})}

export default useQueryDetails