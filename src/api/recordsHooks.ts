import { ApiParams, DirectusWrapper } from "../types/types";
import { api } from "./config";
import { extractIdFromRoute } from "./helpers";
import { useQueryCreate } from "./react-query-hooks/useQueryCreate";
import { useQueryDelete } from "./react-query-hooks/useQueryDelete";
import { useQueryDetails } from "./react-query-hooks/useQueryDetails";
import { useQueryGet } from "./react-query-hooks/useQueryGet";
import { useQueryUpdate } from "./react-query-hooks/useQueryUpdate";

export const useRecords = <RawT, T extends RawT>(
  queryKey: string,
  route: string,
  params?: ApiParams,
  transformFn?: (data: RawT[]) => T[]
) => {
  return useQueryGet({
    getFn: () => getRecords<RawT, T>(route, params, transformFn),
    queryKey: queryKey,
  });
};

export const useCreateRecord = <T extends { id: number | string }>(
  queryKey: string,
  route: string,
  data: T,
  params?: ApiParams,
  navigateTo?: () => void
) => {
  return useQueryCreate({
    createFn: () => createRecord<T>(route, data, params),
    queryKey: queryKey,
    navigateTo,
  });
};

export const useUpdateRecord = <T extends { id: number | string }>(
  queryKey: string,
  route: string,
  data: Partial<T>,
  params?: ApiParams
) => {
  return useQueryUpdate({
    updateFn: () => updateRecord<T>(route, data, params),
    queryKey: queryKey,
  });
};

export const useDeleteRecord = (
  queryKey: string,
  route: string,
  id: number,
  params?: ApiParams
) => {
  return useQueryDelete({
    deleteFn: () => deleteRecord(route, id, params),
    queryKey: queryKey,
  });
};

//API CALLS
export const getRecords = async <RawT, T>(
  route: string,
  params?: ApiParams,
  transformFn?: (data: RawT[]) => T[]
): Promise<T[] | RawT[]> => {
  try {
    console.log("GET RECORDS S called");
    const response = await api.get<DirectusWrapper<RawT[]>>(route, {
      params: params,
    });
    return transformFn ? transformFn(response.data.data) : response.data.data;
  } catch (error) {
    console.error(`Error fetching Records of ${route}:`, error);
    throw error;
  }
};

//   const route = `${route}/${id}`,
export async function getRecord<RawT, T>(
  route: string,
  id: number,
  params?: ApiParams,
  transformFn?: (data: RawT) => T
): Promise<RawT | T | unknown> {
  try {
    const response = await api.get<DirectusWrapper<RawT>>(`${route}/${id}`, {
      params,
    });
    const data = transformFn
      ? transformFn(response.data.data)
      : response.data.data;
    console.log("getReorcd data", data);
    return data;
  } catch (error) {
    console.error(`Error fetching Record of ${route}:`, error);
    throw error;
  }
}

export const createRecord = async <T>(
  route: string,
  data: T,
  params?: ApiParams
): Promise<T> => {
  try {
    const response = await api.post<DirectusWrapper<T>>(route, data, {
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error Creating Record for ${route}:`, error);
    throw error;
  }
};

export const updateRecord = async <T>(
  route: string,
  data: Partial<T>,
  params?: ApiParams
): Promise<T> => {
  try {
    const response = await api.patch<DirectusWrapper<T>>(route, data, {
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error updating Record of ${route}:`, error);
    throw error;
  }
};

export const deleteRecord = async (
  route: string,
  id: number,
  params?: ApiParams
): Promise<number | undefined> => {
  try {
    const routeID = `${route}/${id}`;
    console.log("id from delete axios", id);
    const response = await api.delete(routeID, {
      params: params,
    });
    if (response) return id;
  } catch (error) {
    console.error(`Error updating Record of ${route}:`, error);
    throw error;
  }
};
