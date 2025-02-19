import { useNavigate } from "react-router";
import ListDisplay from "../../components/List/ListDisplay";
import { ContentForModal, MenuItemOptions } from "../../types";
import { useCallback, useState } from "react";
import RenderClientsList from "./components/RenderClientsList";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../api/clientsApi";
import { MenuOptions } from "../../utils/menuItemOptions";

const Clients = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });
  console.log(data);

  const navigate = useNavigate();
  const go2link = "/clients/";

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal((prev) => !prev);
  }, []);

  const navigate2ClientDetails = (id: number) => {
    navigate(go2link + String(id));
    console.log(id);
  };

  const clientMenuOptions = new MenuOptions({
    openFn: navigate2ClientDetails,
    editFn: navigate2ClientDetails,
    deleteFn: handleOpenModal,
  }).getOptions()

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
    <>
    <ListDisplay
      renderList={
        <RenderClientsList
        items={data ?? []}
        navigate2ClientDetails={navigate2ClientDetails}
        menuItemOptions={clientMenuOptions}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        contentForModal={contentForModal}
        />
      }
      ></ListDisplay>
      </>
  );
};

export default Clients;
