import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props<T> = {
    createFn:(data: T) => Promise<T>
    queryKey: string;
  };
  
  const useQueryCreate = <T>({ createFn, queryKey }: Props<T>) => {
      const queryClient = useQueryClient();
      return useMutation({
          mutationFn: (data: T) => createFn(data),
          onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: [queryKey] });
          },
      });
  }
  export default useQueryCreate