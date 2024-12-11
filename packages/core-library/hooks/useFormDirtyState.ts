import { useEffect, useState } from "react";
import { FormState } from "react-hook-form";

/**
 * Makes form's dirty state controlled
 * @param formState React hook form state from react-hook-form
 * @example
 * const { isDirty, setIsDirty } = useBeneficiariesFormDirtyState(formState);
 * console.log(isDirty); // false
 * setIsDirty(true);
 * console.log(isDirty); // true
 */
export const useFormDirtyState = (formState: FormState<{}>) => {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (formState.isDirty) {
      setIsDirty(true);
    }

    return () => {
      setIsDirty(false);
    };
  }, [formState.isDirty]);

  return { isDirty, setIsDirty };
};
