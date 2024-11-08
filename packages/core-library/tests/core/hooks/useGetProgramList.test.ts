import { renderHook } from "../../common";
import useGetProgramList from "../../../hooks/useGetProgramList";
import { standardProgramList } from "../../../core/utils/contants/wc/programs/ProgramListData";
import { useSessionStorage } from "../../../hooks";

jest.mock("../../../config", () => ({
    config: { value: jest.fn() },
  }));
  
jest.mock("../../../core/router", () => ({
    useRouter: jest.fn(),
  }));

jest.mock("../../../hooks/useSessionStorage");

describe("useGetProgramList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

      it("should use the program list from session storage if available", () => {
        const mockStoredProgramList = standardProgramList;
        const setProgramListInStorage = jest.fn();
    
        (useSessionStorage as jest.Mock).mockReturnValue([mockStoredProgramList, setProgramListInStorage]);
    
        const { result } = renderHook(() => useGetProgramList());
    
        expect(result.current.loading).toBe(false);
        expect(result.current.programList).toEqual(mockStoredProgramList);
        expect(setProgramListInStorage).not.toHaveBeenCalled();
      });
})