import { Note, NoteDTO } from "../../types/entities/note";
import { ApiConfig, ApiConfigBase, TransformDTO } from "../../types/types";

const transformNotesData: TransformDTO<NoteDTO, Note> = (note) => {
  return {
    id: note.id,
    status: note.status,
    date_created: note.date_created,
    date_updated: note.date_updated,
    clientId: note.client.id,
    clientName: `${note.client.user.first_name} ${note.client.user.last_name}`,
    note: note.note,
  };
};

const notesApiConfigBase: ApiConfigBase<NoteDTO, Note> = {
  route: "items/notes",
  entity: ["notes"],
  transformFn: transformNotesData,
};

export const notesApiConfig: ApiConfig<NoteDTO, Note> = {
  ...notesApiConfigBase,
  params: {
    fields:
      "id,status,date_created,date_updated,client.id,client.user.first_name,client.user.last_name,note",
  },
};
