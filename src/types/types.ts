export type LoginDataType = {
  email: string;
  password: string;
};
export type DirectusWrapper<T> = {
  data: T;
};

export type Status = "published" | "draft" | "archived";
