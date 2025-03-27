import { GridColDef } from "@mui/x-data-grid";

type GridColDefExtraSettingsType = {
  hidden: boolean;
};
export type DataGridColumnMapType = {
  [key: string]: Partial<GridColDef> & Partial<GridColDefExtraSettingsType>;
};
