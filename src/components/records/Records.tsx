import { ErrorFetch } from "../ErrorFetch";
import { Loading } from "../Loading";
import { RecordConfig, RecordsConfig } from "../../types/types";
import { useRecords } from "../../api_2/records-hooks/useRecords";
import { RecordsContext } from "./context";

type RecordsProps<DTO, T> = {
  recordConfig: RecordsConfig<DTO, T> | RecordConfig<DTO, T>;
  schemaConfig?: any;
  children: React.ReactNode;
};

export const Records = <DTO, T>({
  recordConfig,
  children,
}: RecordsProps<DTO, T>) => {
  const { queryKey, route, transformFn, params } = recordConfig;

  const { data, error, isLoading } = useRecords(
    queryKey,
    route,
    transformFn,
    params
  );

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorFetch />;

  return (
    <RecordsContext.Provider value={{ data }}>
      {children}
    </RecordsContext.Provider>
  );
};
