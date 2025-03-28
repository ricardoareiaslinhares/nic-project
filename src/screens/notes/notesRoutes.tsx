import { RouteObject } from "react-router";
import { DataDetailForm } from "../../components/data-detail/DataDetailForm";
import { Record } from "../../components/record/Record";
import { Records } from "../../components/records/Records";
import { Note } from "../../types/entities/note";
import { notesColumnMap } from "./columnsDefinition";
import { notesApiConfig } from "./notesApiConfig";
import { notesOptions } from "./notesOptions";

export const notesRoutes: RouteObject[] = [
  {
    path: "/notes",
    element: (
      <Records
        recordConfig={notesApiConfig}
        dataGridColumnMap={notesColumnMap}
        dataGridOptions={notesOptions}
      />
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <Record
        recordConfig={notesApiConfig}
        children={<DataDetailForm<Note> collection="notes" />}
      />
    ),
  },
];
