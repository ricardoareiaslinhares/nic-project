import { useQuery } from "@tanstack/react-query";
import { ApiParams, TransformData } from "../../types/types";
import { getSingleRecord } from "../methods";

export const useRecord = <DTO, T>(
  queryKey: string[],
  route: string,
  transformFn: TransformData<DTO, T>,
  params: ApiParams,
  id: number
) => {
  const data = useQuery({
    queryKey: [`${queryKey[0]}, ${id}`],
    queryFn: () => getSingleRecord(route, transformFn, params, id),
  });
  return data;
};
