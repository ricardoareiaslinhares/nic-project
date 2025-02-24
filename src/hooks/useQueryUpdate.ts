import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props<T extends {id: number|string}> = {
    updateFn: (id: number, data: Partial<T>) => Promise<T>
    queryKey: string;
  };

const useQueryUpdate = <T extends {id: number|string}>({ updateFn, queryKey }: Props<T>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<T>) => updateFn(Number(data.id), data),
        networkMode: "always",

        onMutate: async (data) => {
            await queryClient.cancelQueries({ queryKey: [queryKey] });
            const previousData = queryClient.getQueryData([queryKey]);

            queryClient.setQueryData([queryKey], (oldData: T[] = []) => {
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
                queryClient.setQueryData([queryKey], context.previousData);
            }
        },
        onSuccess: (data, _updatedData) => {
            queryClient.setQueryData([queryKey], (oldData: T[] = []) => {
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
              queryClient.invalidateQueries({ queryKey: [queryKey] });
            }
          },
    });
}
export default useQueryUpdate