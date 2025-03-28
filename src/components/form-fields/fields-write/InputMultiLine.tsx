import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { SchemaTransformedType } from "../../types/schema";

type InputMultiLineProps<T extends FieldValues> = {
  field: SchemaTransformedType;
  control: Control<T>;
};

export const InputMultiLine = <T extends FieldValues>({
  field: formField,
  control,
}: InputMultiLineProps<T>) => {
  return (
    <Controller
      name={formField.field as Path<T>}
      //rules={rules}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={formField.options?.placeholder}
          variant="outlined"
          required
          margin="dense"
          type="text"
          multiline
          slotProps={{
            input: {
              sx: {
                minHeight: "200px",
                resize: "vertical",
                overflow: "auto",
                display: "block",
              },
            },
          }}
          fullWidth
          onChange={(e) => {
            const value = e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
  );
};
