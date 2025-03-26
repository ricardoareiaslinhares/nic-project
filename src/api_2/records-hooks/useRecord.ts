import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiParams, TransformData } from "../../types/types";
import { getSingleRecord } from "../methods";

export const useRecord = <DTO, T>(
  queryKey: string[],
  route: string,
  transformFn: TransformData<DTO, T>,
  params: ApiParams,
  id: number
) => {
  console.log("queyrKey", queryKey, id);
  const queryClient = useQueryClient();

  const data = useQuery({
    queryKey: [`${queryKey[0]}, ${id}`],
    queryFn: () => getSingleRecord(route, transformFn, params, id),
  });
  console.log("New USERECORD DATA", data.data);
  return data;
};
