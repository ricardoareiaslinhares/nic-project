import { useQuery } from "@tanstack/react-query";
import { Schema, SchemaDTO } from "../../types/schema";
import { api } from "../config";
const queryKey = ["schema"];

export const useSchema = (collection: string) => {
  return useQuery<Schema[], Error>({
    queryKey: [...queryKey, collection],
    queryFn: () => getSchema(collection),
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false,
  });
};

const getSchema = async (collection: string) => {
  try {
    const response = await api.get(`/fields/${collection}`);
    return response.data.data.map(transformSchemaDTO);
  } catch (error) {
    console.log("Error fetching schema:", error);
    throw error;
  }
};

const transformSchemaDTO = <T extends SchemaDTO>(data: T): Schema => {
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
