import { Typography } from "@mui/material";
import MenuContext from "../../../components/MenuContext/MenuContext";
import Modal from "../../../components/Modal/Modal";
import { ContentForModal, MenuItemOptions } from "../../../types";
import ModalContentDelete from "../../../components/Modal/ModalContentDelete";
import { useCallback, useState } from "react";
import Client from "../../../entities/client";
import ListItemButtonCustom from "../../../components/List/ListItemButtonCustom";
import SearchBar from "../../../components/SearchBar";
import ContentMenu from "../../../components/ContentMenu";

type Props = {
  items: Client[];
  navigate2ClientDetails: (id: number) => void;
  menuItemOptions: MenuItemOptions[];
  openModal: boolean;
  handleOpenModal: () => void;
  contentForModal: ContentForModal;
};

const RenderClientsList = ({
  items,
  navigate2ClientDetails,
  menuItemOptions,
  openModal,
  handleOpenModal,
  contentForModal,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const selectItemId = useCallback((id: number) => {
    setSelectedItemId(id);
  }, []);

  const [filteredData, setFilteredData] = useState<Client[]>(items);

  const handleFilteredData = useCallback((input: string) => {
    if (input) {
      const newData = items.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(items);
    }
  }, []);
  return (
    <>
      {items.length === 0 && <Typography>Sem clientes adicionados</Typography>}
      <ContentMenu handleFilteredData={handleFilteredData} />
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
              selectItemId={selectItemId}
            />
          </div>
        </ListItemButtonCustom>
      ))}
      <Modal open={openModal} handleOpenModal={handleOpenModal}>
        {selectedItemId !== null && (
          <ModalContentDelete
            deleteAction={() => contentForModal.action(selectedItemId)}
            cancelAction={handleOpenModal}
            title={contentForModal.title}
            message={contentForModal.message}
          />
        )}
      </Modal>
    </>
  );
};

export default RenderClientsList;
