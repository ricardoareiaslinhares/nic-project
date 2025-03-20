import { TextField, Select, Checkbox, Autocomplete } from "@mui/material";
import { Input } from "./Input";
import { InputMultiLine } from "./InputMultiLine";
import { DirectusInterface, SchemaTransformedType } from "../../types/schema";
import { StatusBadgeView } from "./fields-view/StatusBadgeView";
import { InputView } from "./fields-view/InputView";

const directusInterfaceMapping: Record<
  DirectusInterface,
  { write: React.ComponentType<any>; read: React.ComponentType<any> }
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
