import { useGetNotesByClientId } from "../api/notes/useNotes";
import { useCollectionSchema } from "../api/schema/useCollectionSchema";
import { ErrorFetch } from "./ErrorFetch";
import { Loading } from "./Loading";
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
  } = useCollectionSchema("notes");

  if (notesIsLoading || schemaIsLoading) return <Loading />;
  if (!notesData || !schema || notesError || schemaError) return <ErrorFetch />;

  return (
    <>
      <NotesForm schema={schema} data={notesData[0]} />
    </>
  );
};
