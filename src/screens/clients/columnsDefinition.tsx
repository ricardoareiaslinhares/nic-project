import { DataGridColumnMapType } from "../../types/dataGrid.types";

export const clientsColumnMap: DataGridColumnMapType = {
  status: {
    hidden: false, // custom field
    field: "status",
    headerName: "Estado",
    width: 150,
    renderCell: (params) => (
      <p style={{ color: params.row.status === "published" ? "green" : "red" }}>
        {params.row.status}
      </p>
    ),
  },
};
