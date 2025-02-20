import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    deletefn: (id: number) => Promise<boolean | undefined>;
    queryKey: string;
};


const useQueryDelete = ({deletefn, queryKey}: Props) => {
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn: (id: number) => deletefn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },}
    );

};

export default useQueryDelete