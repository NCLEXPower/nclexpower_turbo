/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useState, useEffect } from "react";
import { StandardProgramListType } from "../types/wc/programList";
import { useSensitiveInformation } from "./useSensitiveInformation";
import { useBusinessQueryContext } from "../contexts";

export const useGetProgramList = () => {
  const [programList, setProgramList] = useState<StandardProgramListType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { customer } = useSensitiveInformation();
  const { businessQueryGetInternalPrograms } = useBusinessQueryContext();
  
  const { data: internalProgramList, refetch, isFetching, error: fetchError } = 
    businessQueryGetInternalPrograms(["internal_programs_api"], {
      programType: 0,
      accountId: customer?.id,
    });

  useEffect(() => {
    const fetchProgramList = async () => {
      if (programList || isFetching) return;

      setLoading(true);
      setError(null);

      try {
        if (internalProgramList) {
          setProgramList(internalProgramList);
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
  }, [internalProgramList, programList, isFetching, refetch]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch program list from API.");
    }
  }, [fetchError]);

  return { programList, loading, error };
};
