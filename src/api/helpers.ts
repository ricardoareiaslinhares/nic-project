import { Client, ClientRaw } from "../types/client";

export const extractIdFromRoute = (route: string): string | null => {
  const match = route.match(/\/([^\/]+)$/);
  return match ? match[1] : null;
};

// The folowing is called  function overloading, it is used to help TS type inference
export function transformClientData(client: ClientRaw[]): Client[];
export function transformClientData(client: ClientRaw): Client;

export function transformClientData(
  client: ClientRaw | ClientRaw[]
): Client | Client[] {
  if (Array.isArray(client)) {
    return client.map(transformClientData);
  } else {
    return {
      id: client.id,
      psychologist: client.psychologist,
      status: client.status,
      date_created: client.date_created,
      date_updated: client.date_updated,
      name: `${client.user.first_name} ${client.user.last_name}`,
      user: client.user,
    };
  }
}
