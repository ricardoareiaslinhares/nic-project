import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Note } from "../../../entities/note";
import { createNote, updateNote } from "../../../api/notes/notesApi";
import { getFormattedDate } from "../../../utils/formateDate";
import { useEffect } from "react";
import { RenderField } from "../../../components/form-fields/RenderField";
import useQueryCreate from "../../../api/react-query-hooks/useQueryCreate";
import useQueryUpdate from "../../../api/react-query-hooks/useQueryUpdate";
import { useSchemaNotes } from "../../../api/schema/useSchema";

type Props = {
  create: boolean;
  getNoteData: (id: number) => Note;
  newId: number;
  selectedId: number | null;
  modalControl: () => void;
  clientId: number;
  showToast: (isSuccess: boolean, isError: boolean) => void;
};

const FormNote = (props: Props) => {
  const {
    create,
    newId,
    modalControl,
    selectedId,
    getNoteData,
    clientId,
    showToast,
  } = props;

  const data = selectedId !== null && (getNoteData(selectedId) as Note);
  console.log("Data:", data);

  const currentDate = getFormattedDate();

  const { data: schema, error, isLoading } = useSchemaNotes();

  console.log("Schema:", schema);

  const { control, handleSubmit, reset } = useForm<Note>({
    defaultValues: create
      ? {
          id: newId.toString(),
          client: clientId.toString(),
          date: currentDate,
          note: "",
        }
      : { ...data },
  });

  console.log("Controll", control);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const {
    mutate: mutateCreate,
    isError: isErrorCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useQueryCreate({
    queryKey: ["notes", clientId],
    createFn: createNote,
  });

  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useQueryUpdate({
    queryKey: ["notes", clientId],
    updateFn: updateNote,
  });

  useEffect(() => {
    showToast(
      isSuccessUpdate || isSuccessCreate,
      isErrorCreate || isErrorUpdate
    );
  }, [isSuccessCreate, isSuccessUpdate, isErrorCreate, isErrorUpdate]);

  const onSubmit = (newData: Note) => {
    if (create) {
      mutateCreate(newData);
    } else {
      mutateUpdate(newData);
    }
    modalControl();
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}
      >
        {/* <FormControl fullWidth>
          <InputLabel htmlFor="input-date">Data</InputLabel>
          <Input id="input-date" autoComplete="off" {...register("date")} />
        </FormControl>

        <TextField
          id="input-note"
          autoComplete="off"
          label="Nota"
          multiline
          rows={6}
          fullWidth
          {...register("note")}
        />
     */}
        {!isLoading &&
          schema.map((item: any) => (
            <RenderField key={item.field} field={item} control={control} />
          ))}
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isPendingCreate || isPendingUpdate}
      >
        {isPendingCreate || isPendingUpdate
          ? "A enviar dados"
          : create
          ? "Criar Nota"
          : "Atualizar Nota"}
      </Button>
    </Box>
  );
};

export default FormNote;
