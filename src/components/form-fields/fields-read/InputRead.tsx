import { Box, TextField, Typography } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Schema } from "../../../types/schema";

type InputReadOnlyProps<T extends FieldValues> = {
  field: Schema;
  control: Control<T>;
};

export const InputRead = <T extends FieldValues>({
  field,
  control,
}: InputReadOnlyProps<T>) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "start",
        minWidth: "260px",
      }}
    >
      <Typography variant="caption" color="textSecondary">
        {field.note}
      </Typography>
      <Controller
        name={field.field as Path<T>}
        //rules={rules}
        control={control}
        render={({ field }) => (
          <TextField
            value={field.value}
            variant="outlined"
            margin="dense"
            slotProps={{ input: { readOnly: true, sx: { color: "#525252" } } }}
            sx={{
              backgroundColor: "#f5f5f5",
              cursor: "default",
              pointerEvents: "none",
              margin: 0,
              maxWidth: "fit-content",
            }}
          />
        )}
      />
    </Box>
  );
};
