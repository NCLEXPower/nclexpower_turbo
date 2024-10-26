import { useBusinessQueryContext, useExecuteToast } from '../../../../../../../contexts';
import { PricingParams } from '../../../../../../../types/types';
import { PricingForm } from "./PricingForm";

export function PricingFormBlock() {
  const { businessQueryCreatePricing } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCreatePricing();
  const { executeToast } = useExecuteToast();

  async function onSubmit(values: PricingParams) {
    await mutateAsync({ ...values });
    executeToast("Successfully Added", "top-right", false, { type: "success" });
  }
  return <PricingForm onSubmit={onSubmit} submitLoading={isLoading} />;
}
