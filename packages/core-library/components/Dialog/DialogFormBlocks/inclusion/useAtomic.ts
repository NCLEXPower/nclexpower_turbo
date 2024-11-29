/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { atom } from "jotai";
import { EditInclusionParams } from "../../../../api/types";
import { EnvironmentItem } from "../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/types";

export const InclusionIdAtom = atom<EditInclusionParams>();
export const SelectedEnvironment = atom<EnvironmentItem | undefined>(undefined);
