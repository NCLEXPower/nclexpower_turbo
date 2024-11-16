import { useMemo } from "react";

export const useUniqueById = <T extends { id: any }>(menu: T[]): T[] => {
  return useMemo(() => {
    return menu.filter(
      (item, index, self) => self.findIndex((m) => m.id === item.id) === index
    );
  }, [menu]);
};
