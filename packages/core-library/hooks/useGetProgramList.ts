/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/

import { useState, useEffect } from "react";
import { StandardProgramListType } from "../types/wc/programList";
import { standardProgramList, fastrackProgramList } from "../core/utils/contants/wc/programs/ProgramListData";
import { useSessionStorage } from "./useSessionStorage";

export const useGetProgramList = () => {
  const [programList, setProgramList] = useState<StandardProgramListType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [storedProgramList, setProgramListInStorage] = useSessionStorage<StandardProgramListType[]>(
    "programList",
    []
  );

  useEffect(() => {
    const fetchProgramList = async () => {
      if (programList) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (storedProgramList.length > 0) {
          setProgramList(storedProgramList);
        } else {
          // Simulate API fetch, change this once the real API is available
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const list = standardProgramList;

          setProgramListInStorage(list);
          setProgramList(list);
        }
      } catch (err) {
        setError("Failed to load program list.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgramList();
  }, [programList, storedProgramList]);

  return { programList, loading, error };
};