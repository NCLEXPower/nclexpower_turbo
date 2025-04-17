import { NCLEXBanner, ProceedButton, SignOutButton } from "./components";
import {
  Button,
  Card,
  ControlledCheckbox,
  DialogBox,
  EvaIcon,
} from "core-library/components";
import { Box, Typography } from "@mui/material";
import { termsData } from "./constant/ContentData";
import Divider from "core-library/components/Divider/Divider";
import { ProductInformationLoader } from "core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/loader";
import { usePaymentWalkthroughFormContext } from "../../PaymentWalkthroughContext";
import { PrivacyPolicy } from "@/components/blocks/PrivacyPolicyBlock/PrivacyPolicy";
import { useModal } from "core-library/hooks";

interface Props {
  nextStep({}): void;
  previousStep(): void;
  values: {};
  next: () => void;
  previous: () => void;
  onSave?(): void;
}

export function TermsCondition({
  previousStep,
  nextStep,
  next,
  previous,
  onSave,
}: Props) {
  const { form, loading } = usePaymentWalkthroughFormContext();
  const { open, close, props } = useModal();

  if (loading) {
    return <ProductInformationLoader />;
  }

  const handleProceed = () => {
    if (onSave) {
      next();
      nextStep("StripePaymentPage");
      onSave();
    }
  };

  const handlePrevious = () => {
    previousStep();
    previous();
  };

  const handleClick = () => open();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <DialogBox
        open={props.isOpen}
        handleClose={close}
        sx={{
          "& .MuiPaper-root": {
            minHeight: "90%",
            minWidth: "90%",
            pb: "50px",
            borderRadius: "16px",
          },
          "& .MuiDialog-paper > .MuiTypography-root": {
            height: "unset",
            padding: "20px",
            pb: 0,
          },
        }}
      >
        <PrivacyPolicy forPayment />
      </DialogBox>
      <div className="lg:w-[800px] w-full">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handlePrevious}
          >
            <EvaIcon
              name="arrow-back-outline"
              fill="#0F2A71"
              width={20}
              height={20}
            />
            <span className="pt-sans-regular text-[#0F2A71] text-lg">Back</span>
          </div>
          <SignOutButton />
        </Box>
        <div className="w-full">
          <h1 className="pt-sans-bold text-2xl md:text-3xl lg:text-4xl text-darkBlue mb-4">
            More Information
          </h1>
          <Card sx={{ padding: 5, width: "100%" }} elevation={4}>
            <Box sx={{ width: "100%" }}>
              <h1 className="pt-sans-bold text:lg md:text-2xl text-darkBlue">
                Terms, Policies and Conditions
              </h1>
              <Divider color="#0F2A71" thickness={3} sx={{ marginY: "20px" }} />
              <Card
                sx={{
                  padding: 5,
                  width: "100%",
                  height: "20rem",
                  overflowY: "auto",
                  boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                }}
                elevation={4}
              >
                {termsData?.map((term, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Typography
                      gutterBottom
                      sx={{
                        color: "#0F2A71",
                        fontWeight: "bold",
                        fontSize: "clamp(0.90rem, 2.5vw, 1.2rem)",
                      }}
                    >
                      {index + 1}. {term.title}
                    </Typography>
                    {term?.content.map((paragraph, i) => (
                      <Typography
                        key={i}
                        variant="body1"
                        sx={{
                          mb: 2,
                          textIndent: "2em",
                          lineHeight: 1.6,
                          color: "#0F2A71",
                          fontSize: "clamp(0.90rem, 2.5vw, 1.2rem)",
                        }}
                      >
                        {paragraph}{" "}
                        {index === 0 && (
                          <>
                            <Button
                              variant="text"
                              sx={{
                                display: "inline-flex",
                                minHeight: "fit-content",
                                minWidth: "fit-content",
                                padding: 0,
                                pb: "2.5px",
                                margin: 0,
                                fontSize: "inherit",
                                fontWeight: "bold",
                                textDecoration: "underline",
                              }}
                              onClick={handleClick}
                            >
                              here
                            </Button>
                            <span className="text-inherit">{".)"}</span>
                          </>
                        )}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Card>
            </Box>
            {/* <Box sx={{ width: "100%" }}>
              <PrivacyPolicy forPayment />
            </Box> */}
          </Card>
          <div className="w-full flex items-center justify-between my-4">
            <ControlledCheckbox
              control={form.control}
              name="IsAgree"
              label="By clicking this, I agree to the terms and conditions."
              sx={{
                fontSize: "1.2rem",
                width: "100%",
                fontFamily: "PT Sans Narrow",
              }}
            />
          </div>
          <ProceedButton
            disabled={!form.getValues().IsAgree}
            onClick={handleProceed}
          />
        </div>
      </div>
      <NCLEXBanner />
    </Box>
  );
}
