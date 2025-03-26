import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SchemaTransformedType } from "../../../types/schema";

type DropDownProps<T extends FieldValues> = {
  field: SchemaTransformedType;
  control: Control<T>;
};

export const DropDown = <T extends FieldValues>({
  field: formField,
  control,
}: DropDownProps<T>) => {
  const options =
    formField.options?.choices!.map((choice) => {
      return choice.value;
    }) ?? [];

  return (
    <Controller
      name={formField.field as Path<T>}
      control={control}
      render={({ field }) => {
        return (
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select {...field} label="Status">
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};
