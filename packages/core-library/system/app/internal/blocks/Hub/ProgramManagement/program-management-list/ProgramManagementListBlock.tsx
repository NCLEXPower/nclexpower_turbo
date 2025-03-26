/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Button,
  ControlledAccordion,
  DialogBox,
  IconButton,
  EvaIcon,
} from "../../../../../../../components";
import {
  SectionListType,
  StandardProgramListType,
} from "../../../../../../../types/wc/programList";
import Image from "next/image";
import { getSectionTypeIcons } from "../../../../../../../utils/IconUtils";
import { useRouter } from "../../../../../../../core";
import { RemoveProgramDialogContent } from "./components/RemoveProgramDialogContent";
import {
  programIDAtom,
  programTypeAtom,
  RemoveProgramFormType,
} from "./validation";
import {
  useBusinessQueryContext,
  useExecuteToast,
} from "../../../../../../../contexts";
import { useAtom } from "jotai";
import { useApiCallback } from "../../../../../../../hooks";

interface AccordionHeaderProps {
  item: StandardProgramListType;
  expanded: boolean;
  onToggle: (event?: React.SyntheticEvent, newExpanded?: boolean) => void;
  handleEditProgramList: (item: StandardProgramListType) => void;
  handleRemoveProgramList: (item: StandardProgramListType) => void;
}

interface AccordionDetailsProps {
  id: string;
  sections?: SectionListType[];
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  item,
  expanded,
  onToggle,
  handleEditProgramList,
  handleRemoveProgramList,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: 162,
          display: "flex",
          width: "100%",
        }}
      >
        <Image
          src={item.programImage}
          alt={item.title}
          width={180}
          height={162}
          loading="lazy"
          style={{
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: expanded ? "0px" : "16px",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 8,
            py: { sm: 2, md: 6 },
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "18px", md: "20px" },
                textAlign: { xs: "center", md: "left" },
                color: "#3B0086",
                fontFamily: "",
              }}
            >
              {item.title}
            </Typography>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Button
                className="w-[35px]"
                onClick={() => handleEditProgramList(item)}
                sx={{ backgroundColor: "#F4C501", borderRadius: "10px" }}
                data-testid="edit-outline"
              >
                <EvaIcon
                  name="edit-outline"
                  fill="white"
                  width={18}
                  height={18}
                />
              </Button>
              <Button
                onClick={() => handleRemoveProgramList(item)}
                sx={{ backgroundColor: "#D40000", borderRadius: "10px" }}
                data-testid="trash-outline"
              >
                <EvaIcon
                  name="trash-outline"
                  fill="white"
                  width={18}
                  height={18}
                />
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#3B0086",
                fontSize: { xs: "12px", md: "16px" },
                fontFamily: "",
                fontWeight: "400",
              }}
            >
              {item.sections?.length} Sections
            </Typography>
            <IconButton
              sx={{
                color: "white",
                cursor: "pointer",
                transition: "transform 0.3s",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
              onClick={(e) => {
                e?.stopPropagation();
                onToggle(e, !expanded);
              }}
            >
              <EvaIcon
                name="arrow-ios-downward-outline"
                fill="#3B0086"
                width={20}
                height={20}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const AccordionDetails: React.FC<AccordionDetailsProps> = ({
  id,
  sections,
}) => {
  return (
    <>
      <Box sx={{ height: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#dbdfea",
            px: 8,
            py: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "",
              fontSize: "16px",
              color: "black",
              fontWeight: "500",
            }}
          >
            Sections
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          px: 10,
          py: 2,
          pt: 4,
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        {sections && sections.length > 0 ? (
          sections.map((item) => {
            const { sectionId, sectionType, sectionTitle, sectionData } = item;

            const hasVideos = sectionData && sectionData.length > 0;

            return (
              <Box
                key={sectionId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Image
                    src={getSectionTypeIcons(sectionType)}
                    alt={sectionType}
                    width={16}
                    height={16}
                  />
                  <Typography
                    sx={{
                      fontFamily: "",
                      fontSize: "16px",
                      color: "#6C6C6C",
                      fontWeight: "400",
                      cursor: hasVideos ? "pointer" : "default",
                      textDecoration: hasVideos ? "underline" : "none",
                      "&:hover": {
                        textDecoration: hasVideos ? "underline" : "none",
                      },
                    }}
                  >
                    {sectionTitle}
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              color: "gray",
              fontSize: "14px",
            }}
          >
            No available sections
          </Typography>
        )}
      </Box>
    </>
  );
};

export const ProgramManagementListBlock = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] =
    useState<StandardProgramListType | null>(null);
  const { showToast } = useExecuteToast();
  const [, setAtomProgramId] = useAtom(programIDAtom);
  const [, setAtomProgramType] = useAtom(programTypeAtom);
  const [toggleProgramList, setToggleProgramList] = useState<number>(0);

  const { businessQueryGetAllProgramsByType } = useBusinessQueryContext();
  const { data: allProgramsList, refetch } = businessQueryGetAllProgramsByType(
    ["all_programs_api"],
    { programType: toggleProgramList }
  );

  const deleteProgramCB = useApiCallback(
    async (api, args: string) => await api.webbackoffice.deleteProgramById(args)
  );

  const navigateToSections = () => {
    router.push((route) => route.program_section_management);
  };

  const handleCreateProgramList = () => {
    setAtomProgramType(toggleProgramList);
    router.push((route) => route.program_management_list_create);
  };

  const handleEditProgramList = (item: StandardProgramListType) => {
    setAtomProgramType(toggleProgramList);
    setAtomProgramId(item.id);
    router.push((route) => route.program_management_list_edit);
  };

  const handleModalOpen = (item: StandardProgramListType) => {
    setSelectedProgram(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedProgram(null);
    setShowModal(false);
  };

  useEffect(() => {
    refetch();
  }, [toggleProgramList]);

  const handleRemoveProgram = async (values: RemoveProgramFormType) => {
    if (selectedProgram?.title) {
      if (values.program !== selectedProgram.title) {
        showToast("Program topic does not match, Please try again..", "error");
        return;
      }

      try {
        const deleteSectionResult = await deleteProgramCB.execute(
          selectedProgram.id
        );

        if (deleteSectionResult.status === 200) {
          refetch();
          showToast(`${selectedProgram.title} removed successfully`, "success");
          setShowModal(false);
        } else {
          showToast(`Error removing ${selectedProgram.title}`, "error");
        }
      } catch (err) {
        console.error(err);
        showToast(
          `Error removing ${selectedProgram.title}. Please try again`,
          "error"
        );
      }
    }
  };

  const handleToggleProgramList = (programType: number) => {
    setToggleProgramList(programType);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#3b0086",
          }}
        >
          Program Management List
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Button
            onClick={handleCreateProgramList}
            sx={{ backgroundColor: "#3b0086", borderRadius: "10px" }}
          >
            Create
          </Button>
          <Button
            onClick={navigateToSections}
            sx={{ backgroundColor: "#3b0086", borderRadius: "10px" }}
          >
            Manage Sections
          </Button>
        </Stack>
      </Box>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 8 }}>
        <Button
          onClick={() => handleToggleProgramList(0)}
          sx={{
            backgroundColor: `${toggleProgramList === 0 ? "#0F2A71" : "white"}`,
            borderRadius: "20px",
            color: `${toggleProgramList === 0 ? "white" : "black"}`,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: `${toggleProgramList === 0 ? "#25408F" : "#F0F0F0"}`,
              color: `${toggleProgramList === 0 ? "white" : "#0F2A71"}`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Standard (23-Day) Program
        </Button>
        <Button
          onClick={() => handleToggleProgramList(1)}
          sx={{
            backgroundColor: `${toggleProgramList === 1 ? "#0F2A71" : "white"}`,
            borderRadius: "20px",
            color: `${toggleProgramList === 1 ? "white" : "black"}`,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: `${toggleProgramList === 1 ? "#25408F" : "#F0F0F0"}`,
              color: `${toggleProgramList === 1 ? "white" : "#0F2A71"}`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Fast Track (8-Day) Program
        </Button>
      </Stack>
      {showModal && selectedProgram && (
        <DialogBox
          ContentHeight="400px"
          hideCloseButton
          handleClose={handleModalClose}
          open={showModal}
          borderRadius="16px"
          maxWidth="sm"
          children={
            <RemoveProgramDialogContent
              onSubmit={handleRemoveProgram}
              programTitle={selectedProgram?.title || ""}
              closeModal={handleModalClose}
              isLoading={deleteProgramCB.loading}
            />
          }
        />
      )}

      <ControlledAccordion
        accordionMargin="0px 0px 10px 0px"
        accordionRadius="16px"
        headerBackgroundColor="rgba(59, 0, 134, 0.05)"
        items={Array.isArray(allProgramsList) ? allProgramsList : []}
        renderSummary={(item, expanded, onToggle) => (
          <AccordionHeader
            handleEditProgramList={handleEditProgramList}
            handleRemoveProgramList={handleModalOpen}
            item={item}
            expanded={expanded}
            onToggle={onToggle}
          />
        )}
        renderDetails={(item) => {
          const { id, sections } = item;
          return <AccordionDetails id={id} sections={sections} />;
        }}
        noAvailableDataText="No programs available at the moment."
      />
    </Box>
  );
};
