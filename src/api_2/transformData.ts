import { Client, ClientDTO } from "../types/entities/client";
import { TransformData } from "../types/types";

export const extractIdFromRoute = (route: string): string | null => {
  const match = route.match(/\/([^\/]+)$/);
  return match ? match[1] : null;
};

export const transformClientData: TransformData<ClientDTO, Client> = (
  client
) => {
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
