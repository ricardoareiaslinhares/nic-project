import { useMutation, useQueryClient } from "@tanstack/react-query";



type Props<T> = {
  createFn: (data: T) => Promise<T>;
  queryKey: string | [string, number]
};

const useQueryCreate = <T extends { id: string }>({
  createFn,
  queryKey,

}: Props<T>) => {
  const queryClient = useQueryClient();

  let queryKeyA = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useMutation({
    mutationFn: (data: T) => createFn(data),
    networkMode: "always",

    onMutate: async (data) => {
      // awaits cancelation of ongoing queries
      await queryClient.cancelQueries({ queryKey: [...queryKeyA] });

      const previousData = queryClient.getQueryData([...queryKeyA]);
  

      queryClient.setQueryData([...queryKeyA], (oldData: T[] = []) => {
        return [...oldData, data];
      });
      return { previousData };
    },

    onError: (_err, _updatedData, context) => {
      // rollback is response is not successful
      if (context?.previousData) {
        queryClient.setQueryData([...queryKeyA], context.previousData);
      }
    },
    onSuccess: (data, updatedData) => {
      // updates cache with server data if response is successful
      queryClient.setQueryData<T[]>(
        [...queryKey],
        (oldData) =>
          oldData?.map((item) =>
            Number(item.id) === Number(updatedData.id)
              ? { ...item, ...data }
              : item
          ) ?? []
      );
      //queryClient.setQueryData(queryKeyA, data);
    },
    onSettled: (_, error) => {
      // invalidates cache and forces a new request
      if (error) {
        queryClient.invalidateQueries({ queryKey: queryKeyA });
      }
    },
  });
};
export default useQueryCreate;
