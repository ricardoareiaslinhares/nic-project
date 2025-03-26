import { Status } from "../types";

export type ClientDTO = {
  id: number;
  psychologist: number;
  status: Status;
  date_created: string;
  date_updated: string | null;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type Client = {
  id: number;
  psychologist: number;
  status: Status;
  date_created: string;
  date_updated: string | null;
  name: string; //added
  first_name: string;
  last_name: string;
  email: string;
};
