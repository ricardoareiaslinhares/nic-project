import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  deletefn: (id: number) => Promise<number | undefined>;
  queryKey: string;
};

const useQueryDelete = ({ deletefn, queryKey }: Props) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletefn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
        //exact: true,

      });
    },
  });
};

export default useQueryDelete;


