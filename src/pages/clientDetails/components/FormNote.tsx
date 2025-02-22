import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Note from "../../../entities/note";
import { createNote, updateNote } from "../../../api/notesApi";
import useQueryCreate from "../../../hooks/useQueryCreate";
import useQueryUpdate from "../../../hooks/useQueryUpdate";

type Props = {
  create: boolean;
  getNoteData: (id: number) => Note;
  newId: number;
  selectedId: number | null;
  modalControl: () => void;
  clientId: number;
};

const FormNote = (props: Props) => {
  const { create, newId, modalControl, selectedId, getNoteData, clientId } =
    props;

  const data = selectedId !== null && (getNoteData(selectedId) as Note);

  function getFormattedDate(): string {
    return new Date().toISOString().split("T")[0];
  }
  const currentDate = getFormattedDate();

  const { register, handleSubmit } = useForm<Note>({
    defaultValues: create
      ? {
          id: newId.toString(),
          clientId: clientId.toString(),
          date: currentDate,
          note: "",
        }
      : { ...data },
  });

  const {
    mutate: mutateCreate,
    isError: isErrorCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useQueryCreate({
    createFn: createNote,
    queryKey: "notes",
  });

  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useQueryUpdate({
    queryKey: "notes",
    updateFn: updateNote,
  });

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
        <FormControl fullWidth>
          <InputLabel htmlFor="input-date">Data</InputLabel>
          <Input id="input-date" autoComplete="off" {...register("date")} />
        </FormControl>

        <FormControl fullWidth>
          <TextField
           id="input-note" autoComplete="off" 
           label="Nota"
           multiline
           rows={6}
           fullWidth
           {...register("note")}
          />
        </FormControl>
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isPendingCreate}
      >
        {isPendingCreate
          ? "A enviar dados"
          : create
          ? "Criar Nota"
          : "Atualizar Nota"}
      </Button>
    </Box>
  );
};

export default FormNote;
