import { Client } from "../../types/client";
import { DirectusWrapper } from "../../types/types";
import { api } from "./../config";

export const getClients = async (): Promise<Client[]> => {
  const route = "items/clients";
  try {
    const response = await api.get<DirectusWrapper<Client[]>>(route, {
      params: {
        //filter: userId ? { psychologist: { _eq: userId } } : {},
        fields:
          "id,psychologist,user.id,user.first_name,user.last_name,user.email",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const getClientById = async (id: number): Promise<Client> => {
  const route = `items/clients/${id}`;
  try {
    const response = await api.get<DirectusWrapper<Client>>(route, {
      params: {
        fields:
          "id,psychologist,user.id,user.first_name,user.last_name,user.email",
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching client with Id ${id}:`, error);
    throw error;
  }
};

export const createClient = async (clientData: Client): Promise<Client> => {
  try {
    const response = await api.post<DirectusWrapper<Client>>("", clientData);
    return response.data.data;
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
    const response = await api.put<Client>(`${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`Error updating client with Id ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id: number): Promise<number | undefined> => {
  try {
    await api.delete(`${id}`);
    return Number(id);
  } catch (error) {
    console.error(`Error deleting client with Id ${id}:`, error);
    throw error;
  }
};
