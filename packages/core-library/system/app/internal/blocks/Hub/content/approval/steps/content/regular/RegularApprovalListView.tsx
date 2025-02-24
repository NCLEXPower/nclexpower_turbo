import React from "react";
import { ApprovalListViewBlock } from "../../../../../../../../../../components/blocks/ContentApproval/ApprovalListViewBlock";
import { ContentDateType } from "../../../../../../../../../../components/Dialog/DialogFormBlocks/contentApproval/validation";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { useAccountId } from "../../../../../../../../../../contexts/auth/hooks";

type Props = {
  nextStep(values: ContentDateType): void;
};

export const RegularApprovalListView: React.FC<Props> = ({ nextStep }) => {
  const [getAccountId] = useAccountId();
  const accountId = getAccountId ?? "no-account-id";
  const { businessQueryGetContents } = useBusinessQueryContext();

  const { data, isLoading, isError } = businessQueryGetContents(
    ["getAuthorizeContentContents"],
    {
      MainType: "Regular",
      AccountId: accountId,
    }
  );

  const regdata = data?.filter(
    (qtype) => qtype.mainContent.mainType === "Regular"
  );

  return (
    <ApprovalListViewBlock
      nextStep={nextStep}
      data={regdata}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
