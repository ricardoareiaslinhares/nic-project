import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { SchemaTransformedType } from "../../../types/schema";

type InputProps<T extends FieldValues> = {
  field: SchemaTransformedType;
  control: Control<T>;
};

export const Input = <T extends FieldValues>({
  control,
  field,
}: InputProps<T>) => {
  return (
    <Controller
      name={field.field as Path<T>}
      //rules={rules}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={field.name}
          value={field.value}
          variant="outlined"
          required
          size="small"
          margin="dense"
          //type="number"
          sx={{ maxWidth: "fit-content" }}
          onChange={(e) => {
            const value = e.target.value;
            // const numValue = value === "" ? "" : Math.max(0, Number(value));
            field.onChange(value);
          }}
        />
      )}
    />
  );
};
