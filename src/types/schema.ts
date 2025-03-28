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

type SchemaDropDownChoices = {
  text: string;
  value: string;
  color: string;
};

export type SchemaDTO = {
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
      template?: string;
      choices?: SchemaDropDownChoices[];
    };
  };
};

export type Schema = {
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
    template?: string;
    choices?: SchemaDropDownChoices[];
  };
};
