import React, { useEffect, useMemo } from "react";
import { useApi, useApiCallback } from "../../../../../../../hooks";
import { CreateDndOptionsParams } from "../../../../../../../api/types";
import { useAccountId } from "../../../../../../../contexts/auth/hooks";
import { useExecuteToast } from "../../../../../../../contexts";

export const useDndOptions = (questionIndex: number, formId: string) => {
  const [accountId] = useAccountId();
  const { showToast } = useExecuteToast();
  const itemNo = questionIndex + 1;

  const createDndOptionCB = useApiCallback(
    (api, args: CreateDndOptionsParams) =>
      api.webbackoffice.createDndOptions(args)
  );

  const deleteDndOptionCB = useApiCallback((api, args: string) =>
    api.webbackoffice.deleteDndOption(args)
  );

  const { result, execute: fetchOptionList } = useApi((api) =>
    api.webbackoffice.getDndOptionList({
      accountId: accountId || "",
      formId,
      itemNo,
    })
  );

  useEffect(() => {
    fetchOptionList();
  }, [questionIndex, fetchOptionList]);

  const optionList = useMemo(() => result?.data || [], [result?.data]);

  const createDndOption = async (option: string) => {
    try {
      await createDndOptionCB.execute({
        accountId: accountId || "",
        formId,
        itemNo,
        option,
      });
      await fetchOptionList();
    } catch {
      showToast("Something went wrong. Please try again later", "error");
    }
  };

  const deleteDndOption = async (optionId: string) => {
    try {
      await deleteDndOptionCB.execute(optionId);
      await fetchOptionList();
    } catch {
      showToast("Something went wrong. Please try again later", "error");
    }
  };

  return {
    createDndOption,
    deleteDndOption,
    optionList,
  };
};
