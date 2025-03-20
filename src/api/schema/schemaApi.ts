import { SchemaTransformedType, SchemaType } from "../../types/schema";
import { api } from "../config";

export const getSchema = async (collection: string) => {
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

// This fn is not being used, its here for future reference
export const getPermissions = async () => {
  try {
    const response = await api.get(`/permissions`);
    return response.data;
  } catch (error) {
    console.log("Error fetching permissions:", error);
    throw error;
  }
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
