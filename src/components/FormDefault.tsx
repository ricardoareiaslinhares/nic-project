import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import Client from "../entities/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, updateClient } from "../api/clientsApi";

type Props = {
  create: boolean;
  getClientData: (id: number) => Client;
  newId: number;
  selectedId: number | null
  modalControl: () => void;
};

const FormDefault = (props: Props) => {
  console.log("form data runned");
  const { create, newId, modalControl, selectedId, getClientData } = props;
  
  const data = selectedId !== null ? getClientData(selectedId) : {}

  const { register, handleSubmit } = useForm<Client>({
    defaultValues: create
      ? { id: newId.toString(), name: "", email: "" }
      : { ...data },
  });

  const queryClient = useQueryClient();

  const {
    mutate: mutateCreate,
    isError: isErrorCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useMutation({
    mutationFn: (newData: Client) => createClient(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useMutation({
    mutationFn: (newData: Client) => updateClient(Number(data.id), newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
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

export default FormDefault;
