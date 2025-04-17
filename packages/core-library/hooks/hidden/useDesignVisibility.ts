import { atom, useSetAtom } from "jotai";
import { useEffect } from "react";

interface VisibilityState {
  hideHeader: boolean;
  hideFooter: boolean;
}

export const visibilityAtom = atom<VisibilityState>({
  hideHeader: false,
  hideFooter: false,
});

interface Props {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export const useDesignVisibility = ({
  hideHeader = true,
  hideFooter = true,
}: Props = {}) => {
  const setVisibility = useSetAtom(visibilityAtom);

  useEffect(() => {
    setVisibility({ hideHeader, hideFooter });

    return () => setVisibility({ hideHeader: false, hideFooter: false });
  }, [hideHeader, hideFooter, setVisibility]);
};
