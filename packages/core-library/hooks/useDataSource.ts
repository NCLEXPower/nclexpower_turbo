import { useApi } from "./useApi";

interface Props {
  url?: string;
  params?: Record<string, any>;
}

export const useDataSource = ({ url, params }: Props) => {
  const dataSource = useApi((api) =>
    url ? api.web.dataSummary(url, params ?? {}) : Promise.reject()
  );

  const status = {
    isError: !!(
      url &&
      dataSource.error &&
      typeof dataSource.result === "undefined"
    ),
    isSuccess: !!(url && dataSource?.result?.status === 200),
    isLoading: dataSource.loading,
  };

  return { dataSource, ...status };
};
