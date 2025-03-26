import { UseQueryResult } from "@tanstack/react-query";

export type TransformData<DTO, PresentableData> = (
  data: DTO
) => PresentableData;

export type ApiParams = {
  fields?: string;
  filter?: any;
};

export type RecordsConfig<DTO, T> = {
  queryKey: string[];
  route: string;
  transformFn: TransformData<DTO, T>;
  params: ApiParams;
};

export type RecordConfig<DTO, T> = {
  queryKey: string[];
  route: string;
  transformFn: TransformData<DTO, T>;
  params: ApiParams;
};

export type LoginDataType = {
  email: string;
  password: string;
};
export type DirectusWrapper<T> = {
  data: T;
};

export type Status = "published" | "draft" | "archived";

export type User = {
  id: string;
  hidden: boolean;
  readonly: boolean;
  note?: string;
};
