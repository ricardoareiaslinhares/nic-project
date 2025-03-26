import { ErrorFetch } from "./ErrorFetch";
import { Loading } from "./Loading";
import { useParams } from "react-router";
import { validateParamsId } from "../../utils/validateParamsId";
import { RecordConfig, RecordsConfig } from "../../types/types";
import { useRecord } from "../../api_2/records-hooks/useRecord";

type RecordProps<DTO, T> = {
  recordConfig: RecordsConfig<DTO, T> | RecordConfig<DTO, T>;
  schemaConfig?: any;
  //children: React.ReactNode;
  renderComponent: (props: { data: T | T[] }) => React.ReactNode;
};

export const Record = <DTO, T>({
  recordConfig,
  renderComponent,
}: RecordProps<DTO, T>) => {
  const { id } = useParams();

  const numericId = validateParamsId(id);

  const route = numericId
    ? `${recordConfig.route}/${numericId}`
    : recordConfig.route;

  const queryResult = recordConfig.useRecordAction(
    recordConfig.queryKey,
    recordConfig.route,
    recordConfig.transformFn,
    recordConfig.params,
    numericId ? numericId : 42
  );

  const { data, error, isLoading } = queryResult;
  // console.log("RECORD DATA", route, numericId, data);

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorFetch />;

  return renderComponent({ data });
};
