import { useState, useEffect } from "react";
import { StandardProgramListType } from "../types/wc/programList";
import { useSensitiveInformation } from "./useSensitiveInformation";
import { useBusinessQueryContext } from "../contexts";

export const useGetProgramList = () => {
  const [programList, setProgramList] = useState<StandardProgramListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { customer } = useSensitiveInformation();
  const { businessQueryGetInternalPrograms } = useBusinessQueryContext();

  const {
    data: internalProgramList,
    refetch,
    isFetching,
    error: fetchError,
  } = businessQueryGetInternalPrograms(["internal_programs_api"], {
    programType: 0,
    accountId: customer?.id,
  });

  useEffect(() => {
    const fetchProgramList = async () => {
      if (programList.length || isFetching) return;

      setLoading(true);
      setError(null);

      try {
        if (internalProgramList) {
          const normalizedList = Array.isArray(internalProgramList)
            ? internalProgramList
            : [internalProgramList];
          setProgramList(normalizedList);
        } else {
          await refetch();
        }
      } catch (err) {
        setError("Failed to load program list.");
      } finally {
        setLoading(false);
      }
    };

    fetchProgramList();
  }, [internalProgramList, programList.length, isFetching, refetch]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch program list from API.");
    }
  }, [fetchError]);

  return { programList, loading, error };
};
