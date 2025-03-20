import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../config";
import { SchemaTransformedType, SchemaType } from "../../types/schema";

const getSchema = async (collection: string) => {
  try {
    const response = await api.get(`/fields/${collection}`);
    const data = response.data.data.map((field: any) =>
      transformSchemaData(field)
    );
    return data;
  } catch (error) {
    console.log("Error fetching schema:", error);
    throw error;
  }
};

const getPermissions = async () => {
  try {
    const response = await api.get(`/permissions`);
    return response.data;
  } catch (error) {
    console.log("Error fetching permissions:", error);
    throw error;
  }
};

export const useCollectionSchema = (collection: string) => {
  return useQuery({
    queryKey: ["directus", "schema", collection],
    queryFn: () => getSchema(collection),
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch unnecessarily
  });
};

export const useCollectionSchemaPrefetch = (collection: string) => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["directus", "schema", collection],
    queryFn: () => getSchema(collection),
  });
};

export const usePermissions = () => {
  return useQuery({
    queryKey: ["directus", "permissions"],
    queryFn: () => getPermissions(),
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch unnecessarily
  });
};

const transformSchemaData = <T extends SchemaType>(
  data: T
): SchemaTransformedType => {
  const { meta, type } = data;
  const {
    field,
    collection,
    hidden,
    interface: interfaceType,
    readonly,
    required,
    note,
    options,
  } = meta;

  return {
    field,
    collection,
    hidden,
    interfaceType,
    readonly,
    required,
    type,
    note,
    options,
  };
};
