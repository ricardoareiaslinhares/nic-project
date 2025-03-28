import { Box, Typography } from "@mui/material";
import { Status } from "../../../types/types";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { SchemaTransformedType } from "../../../types/schema";

type StatusBadgeViewProps<T extends FieldValues> = {
  field: SchemaTransformedType;
  control: Control<T>;
};

export const StatusBadgeView = <T extends FieldValues>({
  field,
  control,
}: StatusBadgeViewProps<T>) => {
  const statusStyles: Record<
    Status,
    { backgroundColor: string; color: string }
  > = {
    published: { backgroundColor: "#A5D6A7", color: "#1B5E20" },
    draft: { backgroundColor: "#FFF9C4", color: "#F57F17" },
    archived: { backgroundColor: "#FFEBEE", color: "#B71C1C" },
  };

  return (
    <Controller
      name={field.field as Path<T>}
      control={control}
      render={({ field }) => {
        console.log(field.value);
        console.log(statusStyles);
        const status = field.value as Status;
        const styles = statusStyles[status];
        return (
          <Box
            sx={{
              display: "inline-block",
              px: 3,
              py: 1,
              mt: 2,
              borderRadius: "100px",
              backgroundColor: styles.backgroundColor,
              color: styles.color,
            }}
          >
            <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
          </Box>
        );
      }}
    />
  );
};
