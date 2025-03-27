import { Loading } from "../Loading";
import { useRecords } from "../../api_2/records-hooks/useRecords";
import { RecordsContext } from "./context";
import { ErrorFetch } from "../ErrorFetch";
import { DataGridColumnMapType } from "../../types/dataGrid.types";
import { ApiConfig } from "../../types/types";
import { DataGrid } from "../data-grid/DataGrid";

type RecordsProps<DTO, T> = {
  recordConfig: ApiConfig<DTO, T>;
  schemaConfig?: any;
  body?: React.ReactNode;
  dataGridColumnMap: DataGridColumnMapType;
};

export const Records = <DTO, T>({
  recordConfig,
  body,
  dataGridColumnMap,
}: RecordsProps<DTO, T>) => {
  const { entity, route, transformFn, params } = recordConfig;

  const { data, error, isLoading } = useRecords(
    entity,
    route,
    transformFn,
    params
  );

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorFetch />;

  return (
    <RecordsContext.Provider value={{ data }}>
      {body || <DataGrid<T> dataGridColumnMap={dataGridColumnMap} />}
    </RecordsContext.Provider>
  );
};
