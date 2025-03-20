export type Client = {
  id: number;
  psychologist: number;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};
