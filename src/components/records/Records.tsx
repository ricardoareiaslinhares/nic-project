import { ErrorFetch } from "../record/ErrorFetch";
import { Loading } from "../record/Loading";
import { useParams } from "react-router";
import { validateParamsId } from "../../utils/validateParamsId";
import { RecordConfig, RecordsConfig } from "../../types/types";
import { useRecord } from "../../api_2/records-hooks/useRecord";

type RecordsProps<DTO, T> = {
  recordConfig: RecordsConfig<DTO, T> | RecordConfig<DTO, T>;
  schemaConfig?: any;
  //children: React.ReactNode;
  renderComponent: (props: { data: T | T[] }) => React.ReactNode;
};

export const Records = <DTO, T>({
  recordConfig,
  renderComponent,
}: RecordsProps<DTO, T>) => {
  const queryResult = recordConfig.useRecordAction(
    recordConfig.queryKey,
    recordConfig.route,
    recordConfig.transformFn,
    recordConfig.params,
    null
  );

  const { data, error, isLoading } = queryResult;
  // console.log("RECORD DATA", route, numericId, data);

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorFetch />;

  return renderComponent({ data });
};
