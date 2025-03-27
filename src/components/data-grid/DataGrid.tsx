import { GridValidRowModel, DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { DataGridColumnMapType } from "../../types/dataGrid.types";
import { useContextRecords } from "../records/context";
import { generateColumns } from "./helpers";

type DataGridProps = {
  dataGridColumnMap: DataGridColumnMapType;
};

export const DataGrid = <T,>({ dataGridColumnMap }: DataGridProps) => {
  const { data } = useContextRecords<T & GridValidRowModel>();

  const columnsDynamic =
    data.length > 0 ? generateColumns(data[0], dataGridColumnMap) : [];

  return <MUIDataGrid rows={data} columns={columnsDynamic} />;
};

/* 
WORKS
//--------------
  const headerFieldMapperPT = {
    id: "ID",
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    address: "Endereço",
    date_created: "Data de Criação",
    date_updated: "Data de Atualização",
    status: "Estado",
    psychologist: "Psicólogo",
    notes: "notas",
    note: "Nota",
    client: "Cliente",
    first_name: "Primeiro Nome",
    last_name: "Apelido",
  };

  //-----------------

  const generateColumns = <T extends Record<string, unknown>>(
    obj: T,
    mapper: Record<string, string>
  ): GridColDef[] => {
    const keys = Object.keys(obj) as (keyof T)[];
    return keys.map((key) => ({
      field: String(key),
      headerName: mapper[String(key)] ?? String(key),
      width: 150,

    }));
  };

  const columnsDynamic =
    data.length > 0
      ? generateColumns(
          data[0] as Record<keyof T, unknown>,
          headerFieldMapperPT
        )
      : []; 
*/

/* REFERENCE
-------------
  
  rows = [
    { id: 1, name: "John", age: 30 },
  ]
  
  const columns: GridColDef<(T & GridValidRowModel)[number]>[] = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "id",
      headerName: "ID",
      width: 10,
      renderCell: (params) => <p style={{ color: "blue" }}>{params.row.id}</p>,
    },
  ]; */
