import { Status } from "../types";

export type NoteDTO = {
  id: number;
  status: Status;
  date_created: string;
  date_updated: string | null;
  note: string;
  client: {
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };
  };
};

export type Note = {
  id: number;
  status: Status;
  date_created: string;
  date_updated: string | null;
  note: string;
  clientId: number;
  clientName: string;
};
