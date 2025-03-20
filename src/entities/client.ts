export type Client = {
  id: string | number;
  name: string;
  email: string;
};

export type ClientNew = {
  id: number;
  psychologist: number;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};
