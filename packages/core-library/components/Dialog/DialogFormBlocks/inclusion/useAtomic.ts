/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { atom } from 'jotai';
import { EditInclusionParams } from '../../../../api/types';

export const InclusionIdAtom = atom<EditInclusionParams>()
