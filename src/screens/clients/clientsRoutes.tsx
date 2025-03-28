import { RouteObject } from "react-router";
import { DataDetailForm } from "../../components/data-detail/DataDetailForm";
import { Record } from "../../components/record/Record";
import { Records } from "../../components/records/Records";
import { Client } from "../../types/entities/client";
import { clientsApiConfig } from "./clientsApiConfig";
import { clientsOptions } from "./clientsOptions";
import { clientsColumnMap } from "./columnsDefinition";
import { DataDetailView } from "../../components/data-detail/DataDetailView";

export const clientsRoutes: RouteObject[] = [
  {
    path: "/clients",
    element: (
      <Records
        recordConfig={clientsApiConfig}
        dataGridColumnMap={clientsColumnMap}
        dataGridOptions={clientsOptions}
      />
    ),
  },

  {
    path: "/clients/:id",
    element: (
      <Record
        recordConfig={clientsApiConfig}
        children={<DataDetailForm<Client> collection="clients" />}
        //children={<DataDetailView<Client> />}
      />
    ),
  },
];
