import { useMutation, useQueryClient } from "@tanstack/react-query";



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


      const previousData = queryClient.getQueryData([...queryKeyA]);

      queryClient.setQueryData<T[]>([...queryKeyA], (oldData = []) => {
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
        queryClient.setQueryData([...queryKeyA], context.previousData);
        console.log("error delete",_err);
      }
    },
    onSettled: (_, error) => {
      if (error) {
        queryClient.invalidateQueries({ queryKey: [...queryKeyA] });
      }
    },
  });
};

export default useQueryDelete;
