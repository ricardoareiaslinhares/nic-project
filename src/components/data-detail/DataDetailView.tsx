import { Box, Typography } from "@mui/material";
import { useContextRecord } from "../record/context";
import { useSchema } from "../../api_2/schema-hooks/useSchema";
import { Schema } from "../../types/schema";

type DataDetailViewProps = {
  collection?: string;
};

export const DataDetailView = <T,>({
  collection = "clients",
}: DataDetailViewProps) => {
  const { data } = useContextRecord<T>();
  const { data: schema, isLoading, error } = useSchema(collection);
  if (!schema || isLoading || error) return null;
  console.log(schema);
  const keys = Object.keys(data)
  console.log(keys);

  const renderFields = (schema: Schema[], item: T) => {
    return schema.map((field) => {
      const itemKeys = Object.keys(item)
      if (itemKeys.includes(field.field))
      if (field.field === item)

    })
  }

  return (
    <Box>
      <Typography>{data.id}</Typography>
    </Box>
  );
};
