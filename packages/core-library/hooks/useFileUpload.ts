import { useCallback } from "react";
import { UseFormSetValue } from "react-hook-form";

export const useFileUpload = (setValue: UseFormSetValue<any>) => {
  const handleFileChange = useCallback(
    (fieldName: string, fileList: FileList | null) => {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        setValue(fieldName, [file], { shouldValidate: true });
      } else {
        setValue(fieldName, [], { shouldValidate: true });
      }
    },
    [setValue]
  );

  return { handleFileChange };
};
