import { useGetNotesByClientId } from "../api/notes/useNotes";
import { useSchemaNotes } from "../api/schema/useSchema";
import { ErrorFetch } from "../components/ErrorFetch";
import { Loading } from "../components/Loading";
import { NotesForm } from "./NotesForm";

export const NotesScreen = () => {
  const {
    data: notesData,
    error: notesError,
    isLoading: notesIsLoading,
  } = useGetNotesByClientId(1);

  const {
    data: schema,
    error: schemaError,
    isLoading: schemaIsLoading,
  } = useSchemaNotes();

  if (notesIsLoading || schemaIsLoading) return <Loading />;
  if (!notesData || !schema || notesError || schemaError) return <ErrorFetch />;

  return (
    <>
      <NotesForm schema={schema} data={notesData[0]} />
    </>
  );
};
