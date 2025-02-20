import { Typography } from "@mui/material";
import MenuContext from "../../../components/MenuContext/MenuContext";
import Modal from "../../../components/Modal/Modal";
import {
  ContentForModalBase,
  ContentForModalDeleteFn,
  MenuItemOptions,
} from "../../../types";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import { useCallback, useEffect, useMemo, useState } from "react";
import Client from "../../../entities/client";
import ListItemButtonCustom from "../../../components/List/ListItemButtonCustom";
import ContentMenu from "../../../components/ContentMenu";
import ModalContentClient from "./ModalContentClient";
import FormDefault from "../../../components/FormDefault";
import getIdOfLastListItem from "../../../utils/getIdOfLastListItem";
import useQueryDelete from "../../../hooks/useQueryDelete";
import { deleteClient } from "../../../api/clientsApi";
import getItemFromListById from "../../../utils/getItemFromListById";

type Props = {
  items: Client[];
  navigate2ClientDetails: (id: number) => void;
  menuItemOptions: MenuItemOptions[];
  openModalDanger: boolean;
  handleOpenModalDanger: () => void;
  openModalClient: boolean;
  handleOpenModalClient: () => void;
  createClient: boolean;
  closeModalClient: () => void;
};

const RenderClientsList = ({
  items,
  navigate2ClientDetails,
  menuItemOptions,
  openModalDanger,
  handleOpenModalDanger,
  openModalClient,
  handleOpenModalClient,
  createClient,
  closeModalClient,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleSelectItemId = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

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
      console.log("handleFilteredData ")
    },
    [items]
  );
  //

  const {
    mutate: mutateDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
  } = useQueryDelete({ deletefn: deleteClient, queryKey: "clients" });
  ///

  const contentForModalDeleteFn: ContentForModalDeleteFn<Client> = (data) => {
    return (id: number) => {
      const name = getItemFromListById(data, id).name;
      return {
        title: "Apagar Cliente",
        message: `Tem certeza que deseja apagar cliente ${name} ?`,
        action: () => {
          handleOpenModalDanger();
          mutateDelete(id);
        },
      };
    };
  };

  const contentForModalDelete = contentForModalDeleteFn(items);

  const contentForModalClient: ContentForModalBase = {
    title: createClient ? "Adicionar Cliente" : "Editar Cliente",
    message: createClient
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


  const selectClientForEdit2 = useMemo(() => {
    //console.log("selectClientForEdit2 runned");
    return (id: number) => getItemFromListById(items, id);
  }, [items]);


  return (
    <>
      {items.length === 0 && <Typography>Sem clientes adicionados</Typography>}
      <ContentMenu
        handleFilteredData={handleFilteredData}
        addNewClick={handleOpenModalClient}
      />
      {filteredData.map((item: Client) => (
        <ListItemButtonCustom
          key={item.id}
          onClick={() => navigate2ClientDetails(Number(item.id))}
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
      <Modal open={openModalDanger} handleOpenModal={handleOpenModalDanger}>
        {selectedItemId !== null && (
          <ModalContentDelete
            cancelAction={handleOpenModalDanger}
            selectedId={selectedItemId}
            content={contentForModalDelete}
          />
        )}
      </Modal>
      <Modal
        open={openModalClient}
        handleOpenModal={handleOpenModalClient}
        disableOutsideClick
      >
        {selectedItemId !== null && (
          <ModalContentClient
            cancelAction={closeModalClient}
            content={contentForModalClient}
          >
            <FormDefault
              create={createClient}
              newId={newClientId}
              selectedId={selectedItemId}
              getClientData={selectClientForEdit2}
              modalControl={closeModalClient}
            />
          </ModalContentClient>
        )}
      </Modal>
    </>
  );
};

export default RenderClientsList;
