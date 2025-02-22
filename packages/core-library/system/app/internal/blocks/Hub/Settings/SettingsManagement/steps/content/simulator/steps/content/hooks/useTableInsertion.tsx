import { useState, useEffect, useCallback } from "react";

type UseTableInsertionProps = {
  questionType: string | undefined;
  index: number;
};

export const useTableInsertion = ({
  questionType,
  index,
}: UseTableInsertionProps) => {
  const [insertedIndices, setInsertedIndices] = useState<number[]>([]);
  const handleTableInsertion = useCallback(
    (currentIndex: number) => {
      setInsertedIndices((prev) => {
        const newIndices = [...prev];
        const indexExists = newIndices.includes(currentIndex);

        if (indexExists) {
          return newIndices.filter((idx) => idx !== currentIndex);
        } else {
          return [...newIndices, currentIndex];
        }
      });

      return !insertedIndices.includes(currentIndex);
    },
    [insertedIndices]
  );

  useEffect(() => {
    const currentQuestionType = questionType;
    if (currentQuestionType !== "DDTable" && insertedIndices.includes(index)) {
      setInsertedIndices((prev) => prev.filter((idx) => idx !== index));
    }
  }, [questionType, index, insertedIndices]);

  return { insertedIndices, handleTableInsertion };
};
