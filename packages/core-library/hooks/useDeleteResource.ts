import { useApiCallback } from "./useApi";

interface Props {
  url?: string;
}

export const useDeleteResource = ({ url }: Props) => {
  const deleteCb = useApiCallback(async (api, params: Record<string, any>) => {
    if (!url) {
      throw new Error("Url for deletion is required.");
    }

    try {
      const result = await api.web.deleteResource(url, params);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  return {
    deleteCb,
    isLoading: deleteCb.loading,
    error: deleteCb.error,
  };
};
