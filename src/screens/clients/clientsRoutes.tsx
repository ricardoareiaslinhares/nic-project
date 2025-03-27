import { Record } from "../../components/record/Record";
import { Records } from "../../components/records/Records";
import { ClientDetails } from "../../pages/clientDetailsNew/ClientDetails";
import { clientsApiConfig } from "./clientsApiConfig";
import { clientsColumnMap } from "./columnsDefinition";

export const clientsRoutes = [
  {
    path: "/clients",
    element: (
      <Records
        recordConfig={clientsApiConfig}
        dataGridColumnMap={clientsColumnMap}
      />
    ),
  },

  {
    path: "/clients/:id",
    element: (
      <Record recordConfig={clientsApiConfig} children={<ClientDetails />} />
    ),
  },
];
