import { Status } from "../types";

export type Note = {
  id: number;
  status: Status;
  date_created: string;
  date_updated: string | null;
  note: string;
  client: number;
};
