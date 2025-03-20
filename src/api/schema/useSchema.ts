import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPermissions, getSchema } from "./schemaApi";

const queryKey = ["directus", "schema"];

const useSchema = (collection: string) => {
  return useQuery({
    queryKey: [...queryKey, collection],
    queryFn: () => getSchema(collection),
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch unnecessarily
  });
};

const useSchemaPrefetch = (collection: string) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [...queryKey, collection],
    queryFn: () => getSchema(collection),
  });
};

//Not in use, see schemaApi.ts
const usePermissions = () => {
  return useQuery({
    queryKey: ["directus", "permissions"],
    queryFn: () => getPermissions(),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export const useSchemaNotes = () => {
  return useSchema("notes");
};

export const useSchemaClients = () => {
  return useSchema("notes");
};
