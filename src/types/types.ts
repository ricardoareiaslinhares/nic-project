export type TransformDTO<DTO, PresentableData> = (data: DTO) => PresentableData;

export type ApiParams = {
  fields?: string;
  filter?: any;
};

export type ApiConfigBase<DTO, T> = {
  entity: string[];
  route: string;
  transformFn: TransformDTO<DTO, T>;
};

export type ApiConfig<DTO, T> = ApiConfigBase<DTO, T> & { params: ApiParams };

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
