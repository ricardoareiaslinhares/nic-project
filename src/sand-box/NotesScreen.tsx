import { useGetNotesByClientId } from "../api/notes/useNotes";
import { useSchemaNotes } from "../api/schema/useSchema";
import { useRecord, useRecords } from "../api/recordsHooks";
import { ErrorFetch } from "../components/ErrorFetch";
import { Loading } from "../components/Loading";
import { Note } from "../types/entities/note";
import { NotesForm } from "./NotesForm";

export const NotesScreen = () => {
  const {
    data: notesData,
    error: notesError,
    isLoading: notesIsLoading,
  } = useGetNotesByClientId(1);

  // WIth new hooks
  const params = {
    filter: { client: { _eq: 1 } },
    fields: "status,id,date_created,date_updated,client,note",
  };

  const route = "items/notes";

  const {
    data: notesData2,
    error: notesError2,
    isLoading: notesIsLoading2,
  } = useRecords<Note[]>("notes", route, params);
  //---

  const {
    data: schema,
    error: schemaError,
    isLoading: schemaIsLoading,
  } = useSchemaNotes();

  if (notesIsLoading2 || schemaIsLoading) return <Loading />;
  if (!notesData || !schema || notesError2 || schemaError)
    return <ErrorFetch />;

  return (
    <>
      <NotesForm schema={schema} data={notesData2[0]} />
    </>
  );
};
