import { DataGridColumnMapType } from "../../types/dataGrid.types";

export const notesColumnMap: DataGridColumnMapType = {
  id: {
    hidden: false,
    field: "id",
    headerName: "ID",
    width: 50,
  },
  status: {
    hidden: false,
    field: "status",
    headerName: "Estado",
    width: 150,
  },
  date_created: {
    hidden: false,
    field: "date_created",
    headerName: "Criado",
    width: 150,
  },
  date_updated: {
    hidden: false,
    field: "date_updated",
    headerName: "Actualizado",
    width: 150,
  },
};
