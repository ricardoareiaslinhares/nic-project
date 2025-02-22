import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import Client from "../../../entities/client";
import { createClient, updateClient } from "../../../api/clientsApi";
import useQueryUpdate from "../../../hooks/useQueryUpdate";
import useQueryCreate from "../../../hooks/useQueryCreate";

type Props = {
  create: boolean;
  getClientData: (id: number) => Client;
  newId: number;
  selectedId: number | null;
  modalControl: () => void;
};

const FormClient = (props: Props) => {
  console.log("form data runned");
  const { create, newId, modalControl, selectedId, getClientData } = props;

  const data = selectedId !== null && getClientData(selectedId) as Client

  const { register, handleSubmit } = useForm<Client>({
    defaultValues: create
      ? { id: newId.toString(), name: "", email: "" }
      : { ...data },
  });


  const {
    mutate: mutateCreate,
    isError: isErrorCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useQueryCreate({
    createFn: createClient,
    queryKey: "clients",
  });

  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useQueryUpdate({
    queryKey: "clients",
    updateFn: updateClient,
  });

  const onSubmit = (newData: Client) => {
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
          <InputLabel htmlFor="input-name">Nome completo</InputLabel>
          <Input id="input-name" autoComplete="off" {...register("name")} />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input id="input-email" autoComplete="off" {...register("email")} />
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
          ? "Criar Cliente"
          : "Atualizar Cliente"}
      </Button>
    </Box>
  );
};

export default FormClient;
