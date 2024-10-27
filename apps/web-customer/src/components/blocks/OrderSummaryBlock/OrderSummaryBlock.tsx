/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
*/

import { Button } from "core-library/components";
import React from "react";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { useStripeContext } from "core-library/contexts";
import { useRouter } from "core-library";

type Props = {};

export const OrderSummaryBlock: React.FC<Props> = () => {
  const router = useRouter();
  const orderDetail = useDecryptOrder();
  const ProgramTitle = orderDetail?.programTitle;
  const { createPaymentIntentWithClientSecret, getOrderNumber } =
    useStripeContext();

  if (!orderDetail) {
    router.replace("/");
    return;
  }

  return orderDetail ? (
    <div
      className={`${ProgramTitle == 1 ? "from-[#13565A] to-[#0C8087]" : "from-[#0F2A71] to-[#1D50D7]"} bg-gradient-to-b flex justify-center min-h-screen h-fit w-full items-center pt-28 pb-14`}
    >
      <div className="max-w-[545px] min-w-[350px] w-2/3 px-10 py-5 rounded-lg pt-sans-regular bg-white h-fit">
        <div className="p-3">
          <p className="pt-sans-bold text-4xl mb-5 text-[#0F2A71]">
            Order Summary
          </p>
          <p className="pt-sans-regular text-sm">
            Thank you for your order! Below are the details of your selected
            plan and the total price you will be charged. Please review all the
            information before confirming your purchase.
          </p>
        </div>
        <div>
          <div className="pt-2 gap-2 flex flex-col">
            <div className="flex flex-col gap-2 border border-zinc-300 rounded-md p-2">
              <p>Plan name:</p>
              <p className="text-[#0F2A71] font-semibold text-end">
                {orderDetail.productName} (
                {orderDetail.programTitle == 0 ? "RN" : "PN"})
              </p>
              <div>
                <p>Duration: </p>
                <div className="text-[#0F2A71] font-semibold text-end">
                  {orderDetail.programType == 0 ? (
                    <p> 23 Days (Standard)</p>
                  ) : orderDetail.programType == 1 ? (
                    <p> 8 Days (Fast Track)</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-md border border-zinc-300">
              <p>Description : </p>
              <p>{orderDetail.productDescription}</p>
            </div>
          </div>

          <div className="p-2">
            <div className="text-paragraph flex justify-between">
              <p>Balance Amount :</p>
              <p>
                {orderDetail.amount}.00 {orderDetail.currency}
              </p>
            </div>
            <div className=" flex justify-between">
              <p className="font-semibold">Total Amount:</p>
              <p className="font-semibold">
                {orderDetail.amount}.00 {orderDetail.currency}
              </p>
            </div>
          </div>
        </div>
        <div className="pt-2">
          <Button
            onClick={handleProceedCheckout}
            disabled={false}
            sx={{
              mb: 2,
              p: 2,
              minHeight: "fit-content",
              width: "100%",
              fontSize: "14px",
              background: "#0F2A71",
              borderRadius: "4px",
              fontWeight: 600,
              ":focus": {
                outline: "0 !important"
              }
            }}
          >
            PROCEED
          </Button>
          <p className="pt-sans-regular text-center text-sm">
            By proceeding, you accept our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  ) : null;

  async function handleProceedCheckout() {
    if (!orderDetail) return;
    await getOrderNumber();
    await createPaymentIntentWithClientSecret({
      amount: orderDetail.amount,
      currency: orderDetail.currency,
      productDescription: orderDetail.productDescription,
      productName: orderDetail.productName,
      programTitle: orderDetail.programTitle,
      productId: orderDetail.productId,
      pricingId: orderDetail.pricingId,
    });
    await router.push((route) => route.account_registration);
  }
};
