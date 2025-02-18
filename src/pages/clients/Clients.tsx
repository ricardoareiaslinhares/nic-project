import { useNavigate } from "react-router";
import ListDisplay from "../../components/ListDisplay";
import { ContentForModal, MenuItemOptions } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import RenderClientsList from "./components/RenderClientsList";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../api/clientsApi";


const Clients = () => {

  const {data, error, isLoading} = useQuery({
    queryKey:["clients"],
    queryFn: () => getClients()
  })
  console.log(data)

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

 

  const contentForModal: ContentForModal = {
    title: "Apagar Cliente",
    message: "Tem certeza que deseja apagar o cliente?",
    action: (id: number) => {
      console.log("apagar", id);
    },
  };
  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loadingdata</div>;
  return (
    <ListDisplay
      renderList={
        <RenderClientsList
          items={data ?? []}
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
