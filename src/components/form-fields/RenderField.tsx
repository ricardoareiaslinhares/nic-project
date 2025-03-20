import { Control, FieldValues } from "react-hook-form";
import { mappingFields } from "./mappings";
import { SchemaTransformedType } from "../../types/schema";

type RenderFieldProps<T extends FieldValues> = {
  field: SchemaTransformedType;
  control: Control<T>;
};

export const RenderField = <T extends FieldValues>({
  field,
  control,
}: RenderFieldProps<T>) => {
  const FormComponent = mappingFields(field);
  if (!FormComponent) return null;

  return <FormComponent field={field} control={control} />;
};
