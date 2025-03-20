import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props<T extends {id: number|string}> = {
    updateFn: (id: number, data: Partial<T>) => Promise<T>
    queryKey: string | [string, number]
};

const useQueryUpdate = <T extends {id: number|string}>({ updateFn, queryKey }: Props<T>) => {
    const queryClient = useQueryClient();
    let queryKeyA = Array.isArray(queryKey) ? queryKey : [queryKey];

    return useMutation({
        mutationFn: (data: Partial<T>) => updateFn(Number(data.id), data),
        networkMode: "always",

        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: [...queryKeyA] });
            const previousData = queryClient.getQueryData([...queryKeyA]);

            queryClient.setQueryData([...queryKeyA], (oldData: T[] = []) => {
                return oldData.map((item) => {
                    if (Number(item.id) === Number(data.id)) {
                        return { ...item, ...data };
                    }
                    return item;
                });
            });
            return { previousData };
        },
        onError: (_err, _updatedData, context) => {
            if (context?.previousData !== undefined) {
                queryClient.setQueryData([...queryKeyA], context.previousData);
            }
        },
        onSuccess: (data, _updatedData) => {
            queryClient.setQueryData([...queryKeyA], (oldData: T[] = []) => {
                return oldData.map((item) => {
                   if (Number(item.id) === Number(_updatedData.id)) {
                    return { ...item, ...data };
                   }
                   return item
                });
            })
        },
        onSettled: (_data, error) => {
            if (error) {
              queryClient.invalidateQueries({ queryKey: [...queryKeyA] });
            }
          },
    });
}
export default useQueryUpdate