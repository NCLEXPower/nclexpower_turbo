import { usePageLoaderContext } from "../../../../../../../contexts/PageLoaderContext";

export const useContentLoader = () => {
  const { contentLoader, setContentLoader } = usePageLoaderContext();
  return { contentLoader, setContentLoader };
};
