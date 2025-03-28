import { DirectusInterface, Schema } from "../../types/schema";
import { ComponentType } from "react";
import { Input } from "./fields-write/Input";
import { StatusBadgeView } from "./fields-read/StatusBadgeView";
import { InputRead } from "./fields-read/InputRead";
import { InputMultiLine } from "./fields-write/InputMultiLine";
import { DropDown } from "./fields-write/DropDown";
import { NestedInput } from "./fields-write/NestedInput";

const directusInterfaceMapping: Record<
  DirectusInterface,
  { write: ComponentType<any>; read: ComponentType<any> }
> = {
  input: { write: Input, read: InputRead },
  "input-multiline": { write: InputMultiLine, read: InputRead },
  "select-dropdown-m2o": { write: InputRead, read: InputRead },
  "select-dropdown": { write: DropDown, read: StatusBadgeView },
  datetime: { write: Input, read: InputRead },
};

export const mappingFields = (field: Schema) => {
  if (field.hidden) return null;
  if (field.field === "user") return NestedInput;

  if (field.readonly) {
    //console.log("Rendering READ component for", field.interfaceType);
    return directusInterfaceMapping[field.interfaceType]?.read;
  } else {
    // console.log("Rendering WRITE component for", field.interfaceType);
    return directusInterfaceMapping[field.interfaceType]?.write;
  }
};
