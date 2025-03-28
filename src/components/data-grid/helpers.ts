import { GridColDef } from "@mui/x-data-grid";
import { DataGridColumnMapType } from "../../types/dataGrid.types";

/* 
  Fn gets the data to use the keys and match them in a custom mapper
  if the key is in the mapper users the mapper properties
  if not, uses default but with a presentable headerName
*/
export const generateColumns = <T extends Record<string, unknown>>(
  data: T,
  mapper: DataGridColumnMapType
): GridColDef[] => {
  const keys = Object.keys(data) as (keyof T)[];

  return keys
    .filter((key) => !mapper[String(key)]?.hidden)
    .map((key) => {
      const mapperEntry = mapper[String(key)];

      if (!mapperEntry) {
        return {
          field: String(key),
          headerName: presentableDBkey(String(key)),
          headerAlign: "center",
          align: "center",
        };
      }

      return {
        field: mapperEntry.field!,
        headerAlign: "center",
        align: "center",
        ...mapperEntry,
      };
    });
};

const presentableDBkey = (s: string) => {
  return s
    .replace(/_/g, " ") // Replace underscores with spaces first
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (char) => char.toUpperCase()) // Capitalize first letter
    .trim(); // Remove any leading/trailing spaces
};
