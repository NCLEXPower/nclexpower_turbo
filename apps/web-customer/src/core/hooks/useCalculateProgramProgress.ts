import {useState, useEffect} from "react";
import { StandardProgramListType } from "core-library/types/wc/programList";

const useCalculateProgramProgress = (program: StandardProgramListType[]) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        let totalProgress = 0;
        let completedSections = 0;
        let totalSections = 0;

        program.forEach((item) => {
            const { sections = [], programStatus } = item;
            if (programStatus === "progress") {
                totalSections += sections.length;
                completedSections += sections.filter(section => section.sectionStatus === 'completed').length;
            }
        });

        if (totalSections > 0) {
            totalProgress = Math.round((completedSections / totalSections) * 100);
        }

        setProgress(totalProgress);
    }, [program]);

    return progress;
};

export default useCalculateProgramProgress;