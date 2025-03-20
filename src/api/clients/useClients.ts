import { useQueryCreate } from "../react-query-hooks/useQueryCreate";
import { useQueryDelete } from "../react-query-hooks/useQueryDelete";
import { useQueryDetails } from "../react-query-hooks/useQueryDetails";
import { useQueryGet } from "../react-query-hooks/useQueryGet";
import { useQueryUpdate } from "../react-query-hooks/useQueryUpdate";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "./clientsApi";

const queryKey = "clients";

export const useGetClients = () => {
  return useQueryGet({
    getFn: getClients,
    queryKey: queryKey,
  });
};

export const useGetClientById = (clientId: number) => {
  return useQueryDetails({
    getByIdFn: getClients,
    id: clientId,
    queryKey: queryKey,
  });
};

export const useUpdateClient = (clientId: number) => {
  return useQueryUpdate({
    updateFn: updateClient,
    queryKey: [queryKey, clientId],
  });
};

export const useCreateClient = (navigateTo?: () => void) => {
  return useQueryCreate({
    createFn: createClient,
    queryKey: queryKey,
    navigateTo,
  });
};

export const useDeleteClient = () => {
  return useQueryDelete({
    deleteFn: deleteClient,
    queryKey: queryKey,
  });
};
