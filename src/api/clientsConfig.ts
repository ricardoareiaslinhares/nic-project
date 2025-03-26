import { Client, ClientRaw } from "../types/client";
import { RecordConfig } from "../types/types";
import { transformClientData } from "./helpers";
import { useRecord } from "./react-query-hooks/useQueryDetails";
import { useRecords } from "./recordsHooks";

const baseQueryKey = "clients";
const baseRoute = "items/clients";

export const clientsScreenConfig: RecordConfig<ClientRaw, Client> = {
  route: baseRoute,
  queryKey: baseQueryKey,
  useRecordAction: useRecords,
  params: {
    fields:
      "id,psychologist,status,date_created,date_updated,user.id,user.first_name,user.last_name,user.email",
  },
  transformFn: transformClientData,
};

export const clientDetailsScreenConfig: RecordConfig<ClientRaw, Client> = {
  route: baseRoute,
  queryKey: baseQueryKey,
  useRecordAction: useRecord,
  params: {
    fields:
      "id,psychologist,status,date_created,date_updated,user.id,user.first_name,user.last_name,user.email",
  },
  transformFn: transformClientData,
};

type RecordDeleteConfig = {
  route: string;
  queryKey: string;
};

export const clientDeleteConfig: RecordDeleteConfig = {
  route: baseRoute,
  queryKey: baseQueryKey,
};
