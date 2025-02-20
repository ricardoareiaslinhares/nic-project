import { useNavigate } from "react-router";
import ListDisplay from "../../components/List/ListDisplay";
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
  console.log("Client Page rendered")

  const navigate = useNavigate();
  const go2link = "/clients/";

  const navigate2ClientDetails = (id: number) => {
    navigate(go2link + String(id));
    console.log(id);
  };

  // To create modal for delete Client
  const [openModalDanger, setOpenModalDanger] = useState(false);

  const handleOpenModalDanger = useCallback(() => {
    setOpenModalDanger((prev) => !prev);
  }, []);
//---

// To create modal for create / update client
  const [openModalClient, setOpenModalClient] = useState(false);
  const [createClient, setCreateClient] = useState(true); // true = create, false = update

  const handleOpenModalClient = useCallback(() => {
    setCreateClient(true);
    setOpenModalClient((prev) => !prev);
  }, []);

  const closeModalClient = useCallback(() => {
    setOpenModalClient(false);
  }, []);
  
  const editClient = useCallback((id: number) => {
    setCreateClient(false);
    setOpenModalClient((prev) => !prev);
  },[])

  // ----

  const clientMenuOptions = new MenuOptions({
    openFn: navigate2ClientDetails,
    editFn: editClient,
    deleteFn: handleOpenModalDanger,
  }).getOptions();

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
            openModalDanger={openModalDanger}
            openModalClient={openModalClient}
            handleOpenModalDanger={handleOpenModalDanger}
            handleOpenModalClient={handleOpenModalClient}
            createClient={createClient}
            closeModalClient={closeModalClient}

          />
        }
      ></ListDisplay>
    </>
  );
};

export default Clients;
