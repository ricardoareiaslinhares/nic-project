import { DataGridOptions } from "../../types/dataGrid.types";

export const clientsOptions: DataGridOptions = {
  dataGridProps: {
    //onRowDoubleClick: (params) => console.log("clicked", params.row),
  },
  extraOptions: {
    navigateDetails: "/clients/",
  },
};
