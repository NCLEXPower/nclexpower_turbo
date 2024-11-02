import { useAtomValue } from "jotai";
import { hideHeaderAtom } from "./useDesignVisibility";

export const useIsDesignVisible = () => {
  return useAtomValue(hideHeaderAtom);
};
