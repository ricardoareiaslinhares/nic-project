import { useNavigate } from "react-router";
import ListDisplay from "../../components/List/ListDisplay";
import RenderClientsList from "./components/RenderClientsList";
import { MenuOptions } from "../../utils/menuItemOptions";
import { useClientModals } from "../../hooks/useClientModals";
import { Client } from "../../types/entities/client";
import { useContextRecords } from "../../components/records/context";

type CLientsProps = {};

const Clients = ({}: CLientsProps) => {
  const navigate = useNavigate();

  const navigateToClientDetails = (id: number) => {
    console.log(id);
    navigate("/clients/" + String(id));
  };

  const { data } = useContextRecords<Client>();

  // Controlls for create/edit forms Modal and delete warning Modal
  const clientModals = useClientModals();
  const { openEditModal, ...clientModalsProps } = clientModals;

  const clientMenuOptions = new MenuOptions({
    openFn: navigateToClientDetails,
    editFn: clientModals.openEditModal,
    deleteFn: clientModals.toggleModalDelete,
  }).getOptions();

  return (
    <ListDisplay
      renderList={
        <RenderClientsList
          items={data}
          navigateToClientDetails={navigateToClientDetails}
          menuItemOptions={clientMenuOptions}
          clientModals={clientModalsProps}
        />
      }
    ></ListDisplay>
  );
};

export default Clients;
