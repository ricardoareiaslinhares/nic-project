import { useNavigate } from "react-router";
import ListDisplay from "../../components/List/ListDisplay";
import RenderClientsList from "./components/RenderClientsList";
import { getClients } from "../../api/clientsApi"; 
import { MenuOptions } from "../../utils/menuItemOptions";
import useClientModals from "../../hooks/useClientModals";
import useQueryGet from "../../hooks/useQueryGet";
import Client from "../../entities/client";


const Clients = () => {

  const { data, error, isLoading } = useQueryGet<Client>({
    getFn: getClients,
    queryKey: "clients",
  })

  const navigate = useNavigate();
  const go2link = "/clients/";

  const navigateToClientDetails = (id: number) => {
    navigate(go2link + String(id));
  };

  // Controlls for create/edit forms Modal and delete warning Modal
  const clientModals = useClientModals();
  const { openEditModal, ...clientModalsProps } = clientModals;

  const clientMenuOptions = new MenuOptions({
    openFn: navigateToClientDetails,
    editFn: clientModals.openEditModal,
    deleteFn: clientModals.toggleModalDelete,
  }).getOptions();

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loadingdata</div>;

  return (
    <>
      <ListDisplay
        renderList={
          <RenderClientsList
            items={data??[]}
            navigateToClientDetails={navigateToClientDetails}
            menuItemOptions={clientMenuOptions}
            clientModals={clientModalsProps}
          />
        }
      ></ListDisplay>
    </>
  );
};

export default Clients;
