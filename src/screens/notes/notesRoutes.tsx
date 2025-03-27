import { Records } from "../../components/records/Records";
import { notesColumnMap } from "./columnsDefinition";
import { notesApiConfig } from "./notesApiConfig";

export const notesRoutes = [
  {
    path: "/notes",
    element: (
      <Records
        recordConfig={notesApiConfig}
        dataGridColumnMap={notesColumnMap}
      />
    ),
  },
];
