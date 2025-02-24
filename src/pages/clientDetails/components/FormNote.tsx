import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Note from "../../../entities/note";
import { createNote, updateNote } from "../../../api/notesApi";
import useQueryCreate from "../../../hooks/useQueryCreate";
import useQueryUpdate from "../../../hooks/useQueryUpdate";
import getFormattedDate from "../../../utils/getFormattedDate";
import { useEffect } from "react";

type Props = {
  create: boolean;
  getNoteData: (id: number) => Note;
  newId: number;
  selectedId: number | null;
  modalControl: () => void;
  clientId: number;
  showToast: (isSuccess:boolean, isError:boolean) => void
};

const FormNote = (props: Props) => {
  const { create, newId, modalControl, selectedId, getNoteData, clientId, showToast } =
    props;

  const data = selectedId !== null && (getNoteData(selectedId) as Note);

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
        <FormControl fullWidth>
          <InputLabel htmlFor="input-date">Data</InputLabel>
          <Input id="input-date" autoComplete="off" {...register("date")} />
        </FormControl>

          <TextField
           id="input-note" autoComplete="off" 
           label="Nota"
           multiline
           rows={6}
           fullWidth
           {...register("note")}
          />
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isPendingCreate  || isPendingUpdate }
      >
        {isPendingCreate  || isPendingUpdate 
          ? "A enviar dados"
          : create
          ? "Criar Nota"
          : "Atualizar Nota"}
      </Button>
    </Box>
  );
};

export default FormNote;
