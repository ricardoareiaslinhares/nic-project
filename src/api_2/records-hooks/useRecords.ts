import { useQuery } from "@tanstack/react-query";
import { ApiParams, TransformData } from "../../types/types";
import { getRecords } from "../methods";

export const useRecords = <DTO, T>(
  queryKey: string[],
  route: string,
  transformFn: TransformData<DTO, T>,
  params: ApiParams,
  id?: number //TODO refactor to delete after finishing notes
) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getRecords(route, transformFn, params, id),
  });
};
