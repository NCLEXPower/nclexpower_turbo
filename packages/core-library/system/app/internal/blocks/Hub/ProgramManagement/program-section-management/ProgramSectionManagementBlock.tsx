/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography } from "@mui/material";
import { Button } from "../../../../../../../components";
import { useRouter } from "../../../../../../../core";
import { ProgramSectionHeader } from "./components/ProgramSectionHeader";
import { programSectionList } from "../../../../../../../core/utils/contants/wc/programs/ProgramListData";
import { getSectionTypeIcons } from "../../../../../../../utils/IconUtils";
import { useAtom } from "jotai";
import { SectionTitleAtom, SectionTypeAtom } from "./validation";

export const ProgramSectionManagementListBlock = () => {
  const [, setAtomSectionTitle] = useAtom(SectionTitleAtom);
  const [, setAtomSectionType] = useAtom(SectionTypeAtom);
  const router = useRouter();

  const handleBack = () => {
    router.push((route) => route.program_management_list);
  };

  const handleCreateSection = (sectionTitle: string, sectionType: string) => {
    setAtomSectionTitle(sectionTitle);
    setAtomSectionType(sectionType);
    router.push((route) => route.program_section_management_create);
  };

  const handleEditSection = (sectionTitle: string, sectionType: string) => {
    setAtomSectionTitle(sectionTitle);
    setAtomSectionType(sectionType);
    router.push((route) => route.program_section_management_edit);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        sx={{ width: "157px", background: "#3B0086", borderRadius: "10px" }}
        onClick={handleBack}
      >
        Go Back
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          marginBottom: "20px",
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#3b0086",
          }}
        >
          Program Section Management
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {programSectionList.map((section) => {
          const { sectionTitle, sectionType } = section;
          return (
            <ProgramSectionHeader
              showAddButton
              handleCreateSection={() =>
                handleCreateSection(sectionTitle, sectionType)
              }
              handleEditSection={() =>
                handleEditSection(sectionTitle, sectionType)
              }
              sectionTitle={sectionTitle}
              sectionType={sectionType}
              sectionImage={getSectionTypeIcons(sectionType)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
