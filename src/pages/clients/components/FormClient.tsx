import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  useCreateClient,
  useUpdateClient,
} from "../../../api/clients/useClients";
import { Client } from "../../../types/client";
import { useSchemaClients } from "../../../api/schema/useSchema";
import { ErrorFetch } from "../../../components/record/ErrorFetch";
import { Loading } from "../../../components/record/Loading";
import { RenderField } from "../../../components/form-fields/RenderField";

type Props = {
  create: boolean;
  getClientData: (id: number) => Client;
  newId: number;
  selectedId: number | null;
  modalControl: () => void;
  showToast: (isSuccess: boolean, isError: boolean) => void;
};

const FormClient = (props: Props) => {
  const navigate = useNavigate();
  const { create, newId, modalControl, selectedId, getClientData, showToast } =
    props;

  const data = selectedId !== null && (getClientData(selectedId) as Client);
  console.log("Data:", data);

  const { control, handleSubmit } = useForm<Client>({
    defaultValues: create ? {} : { ...data },
  });

  const handleNavigationOnCreate = () => {
    //-1 because the newId updates to a newer number,
    //  right after creation
    navigate(`/clients/${newId - 1}`);
  };

  const {
    mutate: mutateCreate,
    isError: isErrorCreate,
    isPending: isPendingCreate,
    isSuccess: isSuccessCreate,
  } = useCreateClient(handleNavigationOnCreate);

  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateClient();

  useEffect(() => {
    showToast(
      isSuccessUpdate || isSuccessCreate,
      isErrorCreate || isErrorUpdate
    );
  }, [isSuccessCreate, isSuccessUpdate, isErrorCreate, isErrorUpdate]);

  const onSubmit = (newData: Client) => {
    if (create) {
      mutateCreate(newData);
    } else {
      mutateUpdate(newData);
    }
    modalControl();
  };

  const {
    data: schema,
    error: schemaError,
    isLoading: schemaIsLoading,
  } = useSchemaClients();

  if (schemaIsLoading) return <Loading />;
  if (!schema || schemaError) return <ErrorFetch />;

  console.log("Schema:", schema);

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
        {schema.map((field) => (
          <RenderField key={field.field} field={field} control={control} />
        ))}
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
