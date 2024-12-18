import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "../router";

export const useScroll = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = useCallback((id: string, offsetY = 124) => {
    const top = document.getElementById(id)?.offsetTop ?? window.scrollY;
    window.scrollTo({ top: top + offsetY, behavior: "smooth" });
  }, []);
  const scrollTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );
  const enableScroll = useCallback(
    () => (document.body.style.overflowY = "scroll"),
    []
  );
  const disableScroll = useCallback(
    () => (document.body.style.overflowY = "hidden"),
    []
  );

  useEffect(() => {
    enableScroll();
  }, [enableScroll, router.asPath]);

  return useMemo(
    () => ({
      scrollTo,
      scrollTop,
      enableScroll,
      disableScroll,
      isScrolled,
    }),
    [disableScroll, enableScroll, scrollTop, scrollTo, isScrolled]
  );
};
