import { ApiParams, DirectusWrapper, TransformData } from "../types/types";
import { api } from "./config";

export const getRecords = async <DTO, T>(
  route: string,
  transformFn: TransformData<DTO, T>,
  params: ApiParams,
  //@ts-ignore
  id?: number // for TS and maybe notes
): Promise<T[]> => {
  try {
    const response = await api.get<DirectusWrapper<DTO[]>>(route, {
      params: params,
    });
    return response.data.data.map(transformFn);
  } catch (error) {
    console.error(`Error fetching Records of ${route}:`, error);
    throw error;
  }
};

export async function getSingleRecord<DTO, T>(
  route: string,
  transformFn: TransformData<DTO, T>,
  params: ApiParams,
  id: number
): Promise<T> {
  try {
    console.log("SingleRecod", `${route}/${id}`);
    const response = await api.get<DirectusWrapper<DTO>>(`${route}/${id}`, {
      params,
    });
    const data = transformFn(response.data.data);
    console.log("getRecord data NEW", data);
    return data;
  } catch (error) {
    console.error(`Error fetching Record of ${route}:`, error);
    throw error;
  }
}
