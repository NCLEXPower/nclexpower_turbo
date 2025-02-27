import {
  FormProvider,
  useFieldArray,
  useForm
} from "react-hook-form"
import { CustomAccordionSummary } from "../../../../../../components/Accordion/CustomAccordionSummary"
import {
  Card,
  ControlledTextField,
  Button,
  ControlledRichTextEditor,
  EvaIcon,
  InformationTitle
} from "../../../../../../components"
import { policySchema, PolicyType } from "./schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import { Box, Accordion, AccordionDetails, Typography } from "@mui/material"

export const PolicyCreation: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleToggle = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };
  const methods = useForm<PolicyType>({
    mode: "all",
    resolver: yupResolver(policySchema),
  })

  const { handleSubmit, control, getValues } = methods;
  const subSections = getValues("subSection") || [];

  const { append, remove } = useFieldArray({
    control: control,
    name: "subSection",
  })

  const handleAppendSubSection = () => {
    append({ subSectionId: "", subSectionTitle: "", subSectionContent: "" })
  }

  const onSubmit = (data: PolicyType) => {
    //api submission here
  }

  return (
    <Box>
      <InformationTitle
        text='Creation of Policy'
        lineWidth={6}
        lineHeight={35}
        lineColor='#6A5ACD'
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: 'text.primary', fontWeight: 'bold' }}
      />
      <FormProvider {...methods}>
        <Typography sx={{ fontFamily: "PT Sans Narrow", mb: 4 }}>
          Policy management is the process of creating, maintaining, and enforcing policies within an organization
          or system.
        </Typography>
        <Card sx={{ mb: 4, padding: 4 }}>
          <Typography sx={{ fontFamily: "PT Sans", my: 4, fontWeight: "bold" }} variant="h5">
            Section Details
          </Typography>
          <ControlledTextField
            control={control}
            name="sectionId"
            label="Section ID"
            placeholder="e.g. training-program-account-registration"
            required
            sx={{ my: 2 }}
          />
          <ControlledTextField
            control={control}
            name="sectionTitle"
            label="Section Title"
            placeholder="e.g. Training Program - Account Registration"
            required
            sx={{ my: 2 }}
          />
        </Card>
        <div className="w-full flex items-center justify-between p-4 my-4">
          <Typography sx={{ fontFamily: "PT Sans", my: 4, fontWeight: "bold" }} variant="h5">
            SubSections
          </Typography>
          <Button onClick={handleAppendSubSection}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              gap: 1.5,
            }}>
            Add SubSection
            <EvaIcon
              name="plus-square-outline"
              fill="#fff"
              width={30}
              height={30}
              ariaHidden
            />
          </Button>
        </div>
        {subSections.map((_, index) => {
          return (
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleToggle(`panel${index}`)}
              key={index}
              sx={{
                backgroundColor: "transparent",
                color: "#FFF",
                borderRadius: "8px",
                marginBottom: 2,
              }}
            >
              <div className="w-full flex items-center justify-between gap-3">
                <div className="w-full">
                  <CustomAccordionSummary
                    accordionRadius="8px"
                    headerHeight="50px"
                    expanded={expanded === `panel${index}`}
                    onToggle={handleToggle(`panel${index}`)}
                  >
                    <div className="flex items-center justify-between w-full p-4 ">
                      <h2 className="text-white">SubSection {index + 1}</h2>
                      {expanded === `panel${index}` ? (
                        <EvaIcon
                          name="arrow-ios-upward-outline"
                          fill="#FFF"
                          width={30}
                          height={30}
                        />
                      ) : (
                        <EvaIcon
                          name="arrow-ios-downward-outline"
                          fill="#FFF"
                          width={30}
                          height={30}
                        />
                      )}
                    </div>
                  </CustomAccordionSummary>
                </div>
                <div className="w-1/4 flex items-center justify-end">
                  <Button onClick={() => remove(index)} sx={{
                    height: "45px",
                    borderRadius: "10px",
                    width: "100%",
                    textTransform: "none",
                    gap: 1.5,
                    backgroundColor: "#800f2f",
                    "&:hover": {
                      backgroundColor: "#800f2f95",
                    }
                  }}>
                    Remove SubSection
                    <EvaIcon
                      name="minus-square-outline"
                      fill="#fff"
                      width={30}
                      height={30}
                      ariaHidden
                    />
                  </Button>
                </div>

              </div>
              <AccordionDetails sx={{ padding: 4 }}>
                <ControlledTextField
                  control={control}
                  name={`subSection.${index}.subSectionId`}
                  label="SubSection ID"
                  placeholder="e.g. terms-of-use-and-definitions"
                  required
                />
                <ControlledTextField
                  control={control}
                  name={`subSection.${index}.subSectionTitle`}
                  label="SubSection Title"
                  placeholder="e.g. Terms of Use and Definitions"
                  required
                />
                <Box sx={{
                  width: "100%",
                  boxShadow: 1,
                  backgroundColor: "#FFF",
                  color: "#030303",
                  border: "1px solid #0F2A71",
                  paddingX: 4,
                  paddingY: 3,
                  height: '100%',
                  marginTop: 4
                }}>
                  <ControlledRichTextEditor
                    editorFor="casestudy"
                    placeholder="Add content here..."
                    name={`subSection.${index}.subSectionContent`}
                    control={control}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Button onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </FormProvider>
    </Box>
  )
}
