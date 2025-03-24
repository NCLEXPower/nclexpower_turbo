import { useAtomValue } from "jotai";
import { visibilityAtom } from "./useDesignVisibility";

export const useIsDesignVisible = () => {
  return useAtomValue(visibilityAtom);
};