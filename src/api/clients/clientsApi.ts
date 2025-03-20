import { Client, ClientRaw } from "../../types/client";
import { DirectusWrapper } from "../../types/types";
import { api } from "./../config";

const route = "items/clients";

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await api.get<DirectusWrapper<ClientRaw[]>>(route, {
      params: {
        //filter: userId ? { psychologist: { _eq: userId } } : {},
        fields:
          "id,psychologist,user.id,user.first_name,user.last_name,user.email",
      },
    });

    return response.data.data.map((item) => transformData(item));
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const getClientById = async (id: number): Promise<Client> => {
  try {
    const response = await api.get<DirectusWrapper<ClientRaw>>(
      `${route}/${id}`,
      {
        params: {
          fields:
            "id,psychologist,user.id,user.first_name,user.last_name,user.email",
        },
      }
    );

    return transformData(response.data.data);
  } catch (error) {
    console.error(`Error fetching client with Id ${id}:`, error);
    throw error;
  }
};

export const createClient = async (clientData: Client): Promise<Client> => {
  try {
    const response = await api.post<DirectusWrapper<ClientRaw>>(
      route,
      clientData
    );
    return transformData(response.data.data);
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (
  id: number,
  clientData: Partial<Client>
): Promise<Client> => {
  try {
    const response = await api.put<ClientRaw>(`${route}/${id}`, clientData);
    return transformData(response.data);
  } catch (error) {
    console.error(`Error updating client with Id ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<number | undefined> => {
  try {
    await api.delete(`${route}/${id}`);
    return Number(id);
  } catch (error) {
    console.error(`Error deleting client with Id ${id}:`, error);
    throw error;
  }
};

const transformData = (client: ClientRaw): Client => {
  const name = `${client.user.first_name} ${client.user.last_name}`;
  return { name, ...client };
};
