/*

This was usefull when data was fetched from cache, before runing the data[] query. Now im using props for the data, its not needed

on getquery
 queryClient.setQueryData<T[]>([queryKey], (oldData) => {
        if (!oldData) return [data];
        const updatedData = oldData.some((item: any) => item.id === id)
          ? oldData.map((item: any) => (item.id === id ? data : item))
          : [...oldData, data];
        return updatedData;
      });



 initialData: () => {
      // Try to get the full list of clients from cache
      const cachedList = queryClient.getQueryData<T[]>([queryKey]);
      if (cachedList) {
        return cachedList.find((item: any) => item.id === id);
      }
      return undefined;
    }
*/

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiParams } from "../../types/types";
import { getRecord } from "../recordsHooks";

// Updated Props type with more precise function signature
type Props<T> = {
  // Changed to explicitly return a Promise of T
  getByIdFn: () => Promise<T>;
  id: number;
  queryKey: string;
};

export const useQueryDetails = <T>({ getByIdFn, id, queryKey }: Props<T>) => {
  const data = useQuery({
    // TODO: Make queryKey dynamic instead of hardcoded
    queryKey: [queryKey, id],
    queryFn: getByIdFn,
    initialData: undefined,
    enabled: !!id,
  });

  console.log("🔍 Query Result:", {
    id,
    queryKey,
    data: data.data,
    isLoading: data.isLoading,
    isFetching: data.isFetching,
    isError: data.isError,
  });

  return data;
};

export const useRecord = <RawT, T extends RawT>(
  queryKey: string,
  route: string,
  id: number,
  params?: ApiParams,
  transformFn?: (data: RawT) => T
) => {
  return useQueryDetails({
    getByIdFn: () => getRecord<RawT, T>(route, id, params, transformFn),
    id,
    queryKey,
  });
};

export default useQueryDetails;
