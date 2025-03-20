export type DirectusInterface =
  | "input"
  | "select-dropdown-m2o"
  | "select-dropdown"
  | "input-multiline"
  | "datetime";

export type DirectusTypes =
  | { type: "integer"; value: number }
  | { type: "text"; value: string }
  | { type: "float"; value: number };

export type SchemaType = {
  type: DirectusTypes;
  meta: {
    field: string;
    collection: string;
    hidden: boolean;
    interface: DirectusInterface;
    readonly: boolean;
    required: boolean;
    note?: string;
    options?: {
      placeholder?: string;
    };
  };
};

export type SchemaTransformedType = {
  field: string;
  collection: string;
  hidden: boolean;
  interfaceType: DirectusInterface;
  readonly: boolean;
  required: boolean;
  type: DirectusTypes;
  note?: string;
  options?: {
    placeholder?: string;
  };
};
