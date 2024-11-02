import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";

export const hideHeaderAtom = atom(false);

export const useDesignVisibility = (hide: boolean = true) => {
  const setIsHeaderHidden = useSetAtom(hideHeaderAtom);

  useEffect(() => {
    setIsHeaderHidden(hide);

    return () => setIsHeaderHidden(false);
  }, [hide, setIsHeaderHidden]);
};
