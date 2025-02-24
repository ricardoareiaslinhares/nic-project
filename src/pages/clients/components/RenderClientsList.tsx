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
import Client from "../../../entities/client";
import ListItemButtonCustom from "../../../components/List/ListItemButtonCustom";
import ContentMenu from "../../../components/ContentMenu";
import ModalContentClient from "./ModalContentClient";
import FormClient from "./FormClient";
import getIdOfLastListItem from "../../../utils/getIdOfLastListItem";
import useQueryDelete from "../../../hooks/useQueryDelete";
import { deleteClient } from "../../../api/clientsApi";
import getItemFromListById from "../../../utils/getItemFromListById";
import Toast from "../../../components/Toast";
import useToast from "../../../hooks/useToast";



type Props = {
  items: Client[]
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
  

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleSelectItemId = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  // To update the Client list based on the search bar;
  // I pass the filteredList to render
  const [filteredData, setFilteredData] = useState<Client[]>(items);

  useEffect(() => {
    setFilteredData(items);
  }, [items]);

  const handleFilteredData = useCallback(
    (input: string) => {
      if (input) {
        const newData = items.filter((item) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredData(newData);
      } else {
        setFilteredData(items);
      }
    },
    []
  );
  //---

  const {
    mutate: mutateDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useQueryDelete({ deletefn: deleteClient, queryKey: "clients"});

  // Toast control
const {openToast, showToast, closeToast} = useToast();

useEffect(() => {
  showToast(isSuccessDelete, isErrorDelete);
}, [isSuccessDelete, isErrorDelete]);
//--

  const contentForModalDeleteFn: ContentForModalDeleteFn<Client> = (data) => {
    return (id: number) => {
      const name = getItemFromListById(data, id.toString())?.name
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

  /*   const selectClientForEdit = ((items: Client[]) => {
    //console.log("selectClientForEdit runned");
    return (id: number) => {
      return getItemFromListById(items, id);
    };
  })(items); */

  const fallBackClient:Client = {
    id: "0",
    name: "",
    email: "",
  }
  // Fallback client is need because the fn runs upon componet mount
  // and the id is null at that moment

  const selectClientForEdit2 = useMemo(() => {
    return (id: number) => getItemFromListById<Client>(items, id.toString()) ?? fallBackClient;
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
          onClick={() => navigateToClientDetails(Number(item.id))}
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
      <Toast openToast={openToast} closeToast={closeToast}/>
    </>
  );
};

export default RenderClientsList;
