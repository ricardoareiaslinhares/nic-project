import { Typography } from "@mui/material";
import MenuContext from "../../../components/MenuContext/MenuContext";
import Modal from "../../../components/Modal/Modal";
import {
  ContentForModalBase,
  ContentForModalDeleteFn,
  MenuItemOptions,
  ModalsControl,
} from "../../../types";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListItemButtonCustom from "../../../components/List/ListItemButtonCustom";
import ContentMenu from "../../../components/ContentMenu";
import ModalContentClient from "./ModalContentClient";
import FormClient from "./FormClient";
import getIdOfLastListItem from "../../../utils/getIdOfLastListItem";
import Toast from "../../../components/Toast";
import useToast from "../../../hooks/useToast";
import { Client } from "../../../types/client";
import { getItemFromListById } from "../../../utils/getItemFromListById";
import { useDeleteRecord } from "../../../api/recordsHooks";
import { useNavigate } from "react-router";

type Props = {
  items: Client[];
  navigateToClientDetails: (id: number) => void;
  menuItemOptions: MenuItemOptions[];
  clientModals: ModalsControl;
};

const RenderClientsList = ({
  items,
  navigateToClientDetails,
  menuItemOptions,
  clientModals,
}: Props) => {
  const {
    isCreateEditModalOpen,
    isCreateMode,
    openCreateModal,
    closeModal,
    isDeleteModalOpen,
    toggleModalDelete,
  } = clientModals;

  const navigation = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const handleSelectItemId = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);
  // Filtered data
  // - To update the Client list based on the search bar;
  // - I pass the filteredList to render
  const [filteredData, setFilteredData] = useState<Client[]>(items);

  const handleFilteredData = useCallback((input: string) => {
    if (input) {
      const newData = items.filter((item) => {
        let name = item.user.first_name + " " + item.user.last_name;
        return name.toLowerCase().includes(input.toLowerCase());
      });
      setFilteredData(newData);
    } else {
      setFilteredData(items);
    }
  }, []);
  //---

  /*   const {
    mutate: mutateDelete,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteClient(); */
  const {
    mutate: mutateDelete,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
  } = useDeleteRecord("clients", "items/clients", selectedItemId!);

  useEffect(() => {
    setFilteredData(items);
  }, [items]);

  // Toast control
  const { openToast, showToast, closeToast } = useToast();

  useEffect(() => {
    showToast(isSuccessDelete, isErrorDelete);
  }, [isSuccessDelete, isErrorDelete]);
  //--

  const contentForModalDeleteFn: ContentForModalDeleteFn<Client> = (data) => {
    return (id: number) => {
      const name = getItemFromListById(data, id)?.name;
      return {
        title: "Apagar Cliente",
        message: `Tem certeza que deseja apagar cliente ${name} ?`,
        action: () => {
          toggleModalDelete();
          mutateDelete(id);
        },
      };
    };
  };
  const contentForModalDelete = contentForModalDeleteFn(items);

  const contentForModalClient: ContentForModalBase = {
    title: isCreateMode ? "Adicionar Cliente" : "Editar Cliente",
    message: isCreateMode
      ? "Por favor preencha todos os campos"
      : "Por favor modifique os campos que pretende atualizar",
  };
  const newClientId = getIdOfLastListItem(items) + 1;

  const fallBackClient: Client = {
    id: 1,
    psychologist: 101,
    name: "João Silva",
    date_created: new Date().toISOString(),
    date_updated: null,
    status: "published",
    user: {
      first_name: "João",
      last_name: "João",
      email: "João@fallBackClient.com",
    },
  };

  // Fallback client is need because the fn runs upon componet mount
  // and the id is null at that moment

  const selectClientForEdit2 = useMemo(() => {
    return (id: number) =>
      getItemFromListById<Client>(items, id) ?? fallBackClient;
  }, [items]);

  return (
    <>
      {items.length === 0 && <Typography>Sem clientes adicionados</Typography>}
      <ContentMenu
        handleFilteredData={handleFilteredData}
        addNewClick={openCreateModal}
      />
      {filteredData.map((item: Client) => (
        <ListItemButtonCustom
          key={item.id}
          onClick={() => {
            console.log("onClick item", item);
            console.log("number id on click", item.id);
            navigateToClientDetails(Number(item.id));
          }}
        >
          <Typography variant="h6">{item.name}</Typography>
          <div>
            <MenuContext
              menuItemOptions={menuItemOptions}
              id={Number(item.id)}
              selectItemId={handleSelectItemId}
            />
          </div>
        </ListItemButtonCustom>
      ))}
      <Modal open={isDeleteModalOpen} handleOpenModal={toggleModalDelete}>
        {selectedItemId !== null && (
          <ModalContentDelete
            cancelAction={toggleModalDelete}
            selectedId={selectedItemId}
            content={contentForModalDelete}
          />
        )}
      </Modal>
      <Modal
        open={isCreateEditModalOpen}
        handleOpenModal={openCreateModal}
        disableOutsideClick
      >
        <ModalContentClient
          cancelAction={closeModal}
          content={contentForModalClient}
        >
          <FormClient
            create={isCreateMode}
            newId={newClientId}
            selectedId={selectedItemId}
            getClientData={selectClientForEdit2}
            modalControl={closeModal}
            showToast={showToast}
          />
        </ModalContentClient>
      </Modal>
      <Toast openToast={openToast} closeToast={closeToast} />
    </>
  );
};

export default RenderClientsList;
