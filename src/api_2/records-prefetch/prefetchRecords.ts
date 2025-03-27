import { QueryClient } from "@tanstack/react-query";
import { ApiParams, TransformDTO } from "../../types/types";
import { getRecords } from "../methods";

export const prefetchRecords = <DTO, T>(
  queryClient: QueryClient,
  queryKey: string[],
  route: string,
  transformFn: TransformDTO<DTO, T>,
  params: ApiParams,
  id?: number //TODO refactor to delete after finishing notes
) => {
  queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => getRecords(route, transformFn, params, id),
  });
};
