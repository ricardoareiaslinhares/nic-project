import useQueryCreate from "../react-query-hooks/useQueryCreate";
import useQueryDelete from "../react-query-hooks/useQueryDelete";
import useQueryDetails from "../react-query-hooks/useQueryDetails";
import useQueryUpdate from "../react-query-hooks/useQueryUpdate";
import {
  createNote,
  deleteNote,
  getNotesByClientId,
  updateNote,
} from "./notesApi";

const queryKey = "notes";

export const useGetNotesByClientId = (clientId: number) => {
  return useQueryDetails({
    getByIdFn: getNotesByClientId,
    id: clientId,
    queryKey: queryKey,
  });
};

export const useUpdateNote = (noteId: number) => {
  return useQueryUpdate({
    updateFn: updateNote,
    queryKey: [queryKey, noteId],
  });
};

export const useCreateNote = () => {
  return useQueryCreate({
    createFn: createNote,
    queryKey: queryKey,
  });
};

export const useDeleteNote = (noteId: number) => {
  return useQueryDelete({
    deleteFn: deleteNote,
    queryKey: [queryKey, noteId],
  });
};
