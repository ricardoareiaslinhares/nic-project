import { ErrorFetch } from "../ErrorFetch";
import { Loading } from "../Loading";
import { useParams } from "react-router";
import { validateParamsId } from "../../utils/validateParamsId";
import { RecordConfig, RecordsConfig } from "../../types/types";
import { useRecord } from "../../api_2/records-hooks/useRecord";
import { RecordContext } from "./context";

type RecordProps<DTO, T> = {
  recordConfig: RecordsConfig<DTO, T> | RecordConfig<DTO, T>;
  schemaConfig?: any;
  children: React.ReactNode;
};

export const Record = <DTO, T>({
  recordConfig,
  children,
}: RecordProps<DTO, T>) => {
  const { id } = useParams();

  const numericId = validateParamsId(id);

  if (!numericId) return <ErrorFetch />;

  const { queryKey, route, transformFn, params } = recordConfig;

  const { data, error, isLoading } = useRecord(
    queryKey,
    route,
    transformFn,
    params,
    numericId
  );

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorFetch />;

  return (
    <RecordContext.Provider value={{ data }}>{children}</RecordContext.Provider>
  );
};
