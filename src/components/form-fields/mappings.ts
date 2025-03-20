import { DirectusInterface, SchemaTransformedType } from "../../types/schema";
import { StatusBadgeView } from "./fields-view/StatusBadgeView";
import { InputView } from "./fields-view/InputView";
import { InputMultiLine } from "./fields-input/InputMultiLine";
import { Input } from "./fields-input/Input";
import { ComponentType } from "react";

const directusInterfaceMapping: Record<
  DirectusInterface,
  { write: ComponentType<any>; read: ComponentType<any> }
> = {
  input: { write: Input, read: InputView },
  "input-multiline": { write: InputMultiLine, read: InputView },
  "select-dropdown-m2o": { write: Input, read: InputView },
  "select-dropdown": { write: Input, read: StatusBadgeView },
  datetime: { write: Input, read: InputView },
};

export const mappingFields = (field: SchemaTransformedType) => {
  if (field.hidden) return null;
  if (field.readonly) {
    console.log("Rendering READ component for", field.interfaceType);
    return directusInterfaceMapping[field.interfaceType]?.read;
  } else {
    console.log("Rendering WRITE component for", field.interfaceType);
    return directusInterfaceMapping[field.interfaceType]?.write;
  }
};
