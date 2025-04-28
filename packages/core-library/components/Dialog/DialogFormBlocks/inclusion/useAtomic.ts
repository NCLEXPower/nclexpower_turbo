/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { atom } from "jotai";
import { EditInclusionParams } from "../../../../api/types";

export const InclusionIdAtom = atom<EditInclusionParams>();
export const SelectedConfirmationObj = atom<string | undefined | null>();
