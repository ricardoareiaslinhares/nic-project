import { useMutation, useQueryClient } from "@tanstack/react-query";

type QueryKey = [string, number]

type Props = {
  deletefn: (id: number) => Promise<number | undefined>;
  queryKey: string | [string, number]
};

const useQueryDelete = <T extends { id: string }>({
  deletefn,
  queryKey,
}: Props) => {
  const queryClient = useQueryClient();
  let queryKeyA = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useMutation({
    mutationFn: (id: number) => deletefn(id),
    networkMode: "always",

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [...queryKeyA] });

      const previousData = queryClient.getQueryData([...queryKey]);

      queryClient.setQueryData<T[]>([...queryKey], (oldData = []) => {
        // console.log("Before filtering:", oldData);
        //  console.log("ID to delete:", id);

        const newOld = oldData.filter((item) => {
          //console.log("Comparing:", Number(item.id), "!==", id);
          return Number(item.id) !== id;
        });
        //console.log("After filtering:", newOld);
        return newOld;
      });
      return { previousData };
    },
    onError: (_err, _updatedData, context) => {
      if (context?.previousData !== undefined) {
        queryClient.setQueryData([...queryKey], context.previousData);
      }
    },
    onSettled: (_, error) => {
      if (error) {
        queryClient.invalidateQueries({ queryKey: [...queryKey] });
      }
    },
  });
};

export default useQueryDelete;
