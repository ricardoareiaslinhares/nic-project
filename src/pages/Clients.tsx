import { useNavigate } from "react-router";
import ListDisplay from "../components/ListDisplay";
import { MenuItemOptions } from "../types";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {};

const Clients = (props: Props) => {
  const navigate = useNavigate();
  const go2link = "/clients/";

  const menuItemOptions: MenuItemOptions[] = [
    {
      label: "Abrir",
      icon: <VisibilityIcon />,
      onClick: (id:number) => { navigate(go2link + String(id)) },
    },
    {
      label: "Editar",
      icon: <EditIcon />,
      onClick: (id:number) => { navigate(go2link + String(id)) },
    },
    {
      label: "Apagar",
      icon: <DeleteIcon />,
      onClick: (id:number) => { navigate(go2link + String(id)) },
    },
  ];
  return (
    <ListDisplay
      items={[
        { id: 1, name: "Client 1", email: "email1" },
        { id: 2, name: "Client 2", email: "email2" },
      ]}
      proprieties={["email"]}
      go2link={go2link}
      menuItemOptions={menuItemOptions}
    />
  );
};

export default Clients;
