import { Client, ClientDTO } from "../../types/entities/client";
import { ApiConfig, ApiConfigBase, TransformDTO } from "../../types/types";

const transformClientData: TransformDTO<ClientDTO, Client> = (client) => {
  // TODO Use PICK / OMIT for rolebased Acess data transformation
  console.log("DTO TRANSFORMATION OCURRED");
  return {
    id: client.id,
    psychologist: client.psychologist,
    status: client.status,
    date_created: client.date_created,
    date_updated: client.date_updated,
    name: `${client.user.first_name} ${client.user.last_name}`,
    first_name: client.user.first_name,
    last_name: client.user.last_name,
    email: client.user.email,
  };
};

const clientApiConfigBase: ApiConfigBase<ClientDTO, Client> = {
  route: "items/clients",
  entity: ["clients"],
  transformFn: transformClientData,
};

export const clientsApiConfig: ApiConfig<ClientDTO, Client> = {
  ...clientApiConfigBase,
  params: {
    fields:
      "id,psychologist,status,date_created,date_updated,user.id,user.first_name,user.last_name,user.email",
  },
};
