/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { ParseBlocks } from "core-library/system";
import { useDesignVisibility } from "core-library/hooks";

function DuplicateSessionPage() {
  useDesignVisibility();

  return <ParseBlocks blocks="DuplicateSessionBlock" />;
}

export default DuplicateSessionPage;
