export type Note = {
  id: string | number;
  clientId: string | number;
  date: string;
  note: string;
};

export type NoteNew = {
  id: number;
  //status: "published" | "draft" | "archived"; // Assuming possible statuses
  //user_created: string; // UUID
  date_created: string; // ISO date string
  //user_updated: string | null; // UUID or null
  date_updated: string | null; // ISO date string or null
  notes: string;
  client: number;
};
