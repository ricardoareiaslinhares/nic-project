import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPermissions, getSchema } from "./schemaApi";
import { Schema } from "../../types/schema";

const queryKey = ["directus", "schema"];

const useSchema = (collection: string) => {
  return useQuery<Schema[], Error>({
    queryKey: [...queryKey, collection],
    queryFn: () => getSchema(collection),
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false,
  });
};

export const useSchemaNotes = () => {
  return useSchema("notes");
};

export const useSchemaClients = () => {
  return useSchema("clients");
};

export const useSchemaNested = (collection: string) => {
  return useSchema(collection);
};

//Not in use
const useSchemaPrefetch = (collection: string) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [...queryKey, collection],
    queryFn: () => getSchema(collection),
  });
};

const usePermissions = () => {
  return useQuery({
    queryKey: ["directus", "permissions"],
    queryFn: () => getPermissions(),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
