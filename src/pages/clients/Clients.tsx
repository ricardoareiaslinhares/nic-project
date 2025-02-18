import { useNavigate } from "react-router";
import ListDisplay from "../../components/ListDisplay";
import { ContentForModal, MenuItemOptions } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import RenderClientsList from "./components/RenderClientsList";
import SearchBar from "../../components/SearchBar";

type Props = {};

const Clients = (props: Props) => {
  const navigate = useNavigate();
  const go2link = "/clients/";

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    console.log("handleOpenModal called");
    setOpenModal((prev) => !prev);
  }, []);

  const navigate2ClientDetails = (id: number) => {
    navigate(go2link + String(id));
    console.log(id);
  };

  const menuItemOptions: MenuItemOptions[] = [
    {
      label: "Abrir",
      icon: <VisibilityIcon />,
      onClick: (id: number) => {
        navigate2ClientDetails(id);
      },
    },
    {
      label: "Editar",
      icon: <EditIcon />,
      onClick: (id: number) => {
        navigate2ClientDetails(id);
      },
    },
    {
      label: "Apagar",
      icon: <DeleteIcon />,
      onClick: () => {
        handleOpenModal();
      },
    },
  ];

  const items = [
    { id: 1, name: "Client 1", email: "email1" },
    { id: 2, name: "Client 2", email: "email2" },
  ];

  const contentForModal: ContentForModal = {
    title: "Apagar Cliente",
    message: "Tem certeza que deseja apagar o cliente?",
    action: (id: number) => {
      console.log("apagar", id);
    },
  };
  return (
    <ListDisplay
      renderList={
        <RenderClientsList
          items={items}
          navigate2ClientDetails={navigate2ClientDetails}
          menuItemOptions={menuItemOptions}
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          contentForModal={contentForModal}
        />
      }
    ></ListDisplay>
  );
};

export default Clients;
