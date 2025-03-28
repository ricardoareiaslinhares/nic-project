import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { useSchema } from "../../api_2/schema-hooks/useSchema";
import { RenderField } from "../form-fields/RenderField";
import { useContextRecord } from "../record/context";
import { Box, Button } from "@mui/material";

type DataDetailProps = {
  collection: string;
};

export const DataDetailForm = <T extends FieldValues>({
  collection,
}: //TODO Flag for update/create
DataDetailProps) => {
  const { data } = useContextRecord<T>();
  const { control, handleSubmit } = useForm<T>({
    defaultValues: (data ?? {}) as DefaultValues<T>, // a ver que tal o TS
  });
  const { data: schema, isLoading, error } = useSchema(collection);

  if (!schema || isLoading || error) return null; // TODO change this

  const onSubmit = (data: T) => {
    console.log("onSubmit", data);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {schema.map((field) => (
        <RenderField key={field.field} field={field} control={control} />
      ))}

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        //disabled={isPendingCreate}
      >
        Submeter
      </Button>
    </Box>
  );
};
