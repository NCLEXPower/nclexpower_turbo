/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import {
  AvailableWhiteIcon,
  InProgressWhiteIcon,
  CompletedWhiteIcon,
} from "core-library/assets";
import { StandardProgramListType } from "core-library/types/wc/programList";
import useCalculateProgramProgress from "../../../../core/hooks/useCalculateProgramProgress";
import { ProgressCircle } from "../../../../components/ProgressCircle/ProgressCircle";
import { DialogBox } from "core-library/components/Dialog/DialogBox";
import { ProgramGridContent } from "./ProgramGridContent";
import { separateSectionType } from "./ProgramListBlockUtils";

interface Props {
  program: StandardProgramListType[];
}

export const ProgramGridView: React.FC<Props> = ({ program }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const progress = useCalculateProgramProgress(program);

  const handleModalOpen = (programId: string) => {
    setSelectedProgramId(programId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedProgramId(null);
    setShowModal(false);
  };

  const selectedProgram = program.find(
    (program) => program.id === selectedProgramId
  );

  return (
    <>
      <Box
        data-testid="grid-view"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full fadeIn"
      >
        {program.length === 0 ? (
          <>
            <h4 className="font-ptSansNarrow text-center text-gray-500">
              No programs available at the moment.
            </h4>
          </>
        ) : (
          program.map((item) => {
            const { id, title, programStatus, programImage, sections } = item;
            const { videoSections, otherSections } = separateSectionType(
              sections ?? []
            );
            const combinedSectionsCount =
              otherSections.length + (videoSections.length > 0 ? 1 : 0);
            return (
              <>
                <Box
                  key={id}
                  className={`h-auto w-full lg:w-[254px] bg-gradient-to-r from-mainBlue to-[#181E2F] rounded-[16px] border border-slate-400 overflow-hidden ${
                    programStatus === "unavailable"
                      ? "opacity-50 pointer-events-none"
                      : "opacity-100 cursor-pointer"
                  }`}
                  onClick={() => handleModalOpen(id)}
                >
                  <div className="flex flex-col">
                    <div className="w-full aspect-[422/379.8] bg-white">
                      <Image
                        src={programImage}
                        alt={title}
                        width={254}
                        height={100}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center h-auto py-2 space-y-[10px]">
                      <h2 className="font-ptSansNarrow font-bold text-[20px] text-white">
                        {title}
                      </h2>
                      <div className="relative w-auto flex items-center justify-center bg-[#181E2F] px-4 py-1 rounded-[10px] gap-1">
                        {programStatus === "progress" && (
                          <>
                            <ProgressCircle progress={progress} />
                            <h4 className="text-white font-ptSansNarrow font-regular text-[16px] pl-4">
                              {progress}%
                            </h4>
                          </>
                        )}
                        <h4 className="font-ptSansNarrow text-white font-regular text-[16px] capitalize">
                          {programStatus === "unavailable"
                            ? "Start"
                            : programStatus}
                        </h4>
                        <Image
                          src={
                            programStatus === "completed"
                              ? CompletedWhiteIcon
                              : programStatus === "progress"
                                ? InProgressWhiteIcon
                                : AvailableWhiteIcon
                          }
                          alt={programStatus}
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className="flex justify-center md:justify-end w-full pr-0 md:pr-4">
                        <h4 className="text-white text-[18px] font-regular font-ptSansNarrow">
                          {combinedSectionsCount} Sections
                        </h4>
                      </div>
                    </div>
                  </div>
                </Box>
              </>
            );
          })
        )}
        {selectedProgram && (
          <DialogBox
            hideCloseButton
            handleClose={handleModalClose}
            open={showModal}
            borderRadius="16px"
            children={
              <ProgramGridContent
                sections={selectedProgram.sections || []}
                title={selectedProgram.title}
                closeModal={handleModalClose}
                programId={selectedProgram.id}
              />
            }
            maxWidth="xs"
          />
        )}
      </Box>
    </>
  );
};
