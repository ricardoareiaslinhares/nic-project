import { Box, Button } from "@mui/material";
import { SchemaTransformedType } from "../types/schema";
import { Note } from "../types/note";
import { RenderField } from "../components/form-fields/RenderField";
import { useForm } from "react-hook-form";
import { useUpdateNote } from "../api/notes/useNotes";

type NotesFormProps = {
  schema: SchemaTransformedType[];
  data: Note;
};

export const NotesForm = ({ schema, data }: NotesFormProps) => {
  const { control, handleSubmit } = useForm<Note>({
    defaultValues: { ...data },
  });

  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateNote(data.id);

  const onSubmit = async (data: Note) => {
    mutateUpdate(data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {schema.map((field) => (
        <RenderField key={field.field} field={field} control={control} />
      ))}
      <Button type="submit">Salvar</Button>
    </Box>
  );
};
