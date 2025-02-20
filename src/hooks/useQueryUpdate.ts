import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props<T extends {id: number|string}> = {
    updateFn: (id: number, data: Partial<T>) => Promise<T>
    queryKey: string;
  };

const useQueryUpdate = <T extends {id: number|string}>({ updateFn, queryKey }: Props<T>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<T>) => updateFn(Number(data.id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
}
export default useQueryUpdate