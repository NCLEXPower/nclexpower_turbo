import { useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { atom } from "jotai";

export const fileRoutesAtom = atom<string[]>();

export const useSetFileRoutes = (fileRoutes: string[] | undefined) => {
  const setFileRoutes = useSetAtom(fileRoutesAtom);

  const stableFileRoutes = useMemo(() => fileRoutes, [fileRoutes]);

  useEffect(() => {
    setFileRoutes(stableFileRoutes);
  }, [setFileRoutes, stableFileRoutes]);
};
