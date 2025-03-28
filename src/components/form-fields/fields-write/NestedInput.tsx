import { Control, FieldValues } from "react-hook-form";
import { SchemaTransformedType } from "../../../types/schema";
import { USER_SCHEMA } from "../../../constants/constants";
import { RenderField } from "../RenderField";

type NestedInputProps<T extends FieldValues> = {
  field: SchemaTransformedType;
  control: Control<T>;
};

export const NestedInput = <T extends FieldValues>({
  field: formField,
  control,
}: NestedInputProps<T>) => {
  //gets nested field name = formField.field
  //makes an api call for schema
  //however, if it is users, it renders a predifined schema
  const fieldName = formField.field;
  let nestedSchema: SchemaTransformedType[];

  if (fieldName === "user") {
    nestedSchema = USER_SCHEMA;
  }

  return (
    <>
      {nestedSchema!.map((field) => (
        <RenderField key={field.field} field={field} control={control} />
      ))}
    </>
  );
};
