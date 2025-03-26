import { transformClientData } from "./transformData";
import { Client, ClientDTO } from "../types/entities/client";
import { useRecords } from "./records-hooks/useRecords";
import { useRecord } from "./records-hooks/useRecord";
import { RecordConfig, RecordsConfig } from "../types/types";

const baseQueryKey = "clients";
const baseRoute = "items/clients";

export const clientsScreenConfig: RecordsConfig<ClientDTO, Client> = {
  route: baseRoute,
  queryKey: [baseQueryKey],
  transformFn: transformClientData,
  params: {
    fields:
      "id,psychologist,status,date_created,date_updated,user.id,user.first_name,user.last_name,user.email",
  },
  useRecordAction: useRecords,
};

export const clientDetailsScreenConfig: RecordConfig<ClientDTO, Client> = {
  route: baseRoute,
  queryKey: [baseQueryKey],
  transformFn: transformClientData,
  params: {
    fields:
      "id,psychologist,status,date_created,date_updated,user.id,user.first_name,user.last_name,user.email",
  },
  useRecordAction: useRecord,
};
