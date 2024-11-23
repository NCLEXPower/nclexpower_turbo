import { useAccessControl } from "../../hooks";
import { AccessLevels } from "../../core/utils/permission";
import { renderHook } from "../common";
import { useAccessLevel } from "../../contexts/auth/hooks";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../contexts/auth/hooks", () => ({
  useAccessLevel: jest.fn(),
}));

describe("useAccessControl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("should pass if ADMIN has access to OtherConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.ADMIN,
    ]);

    const { result } = renderHook(() => useAccessControl());

    expect(result.current.hasAccess("OtherConfigurations")).toBe(true);
  });

  it("should pass if ENCODER has no access to ContentManagementSystemSettings", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.EDITOR,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("ContentManagementSystemSettings")).toBe(
      false
    );
  });

  it("should pass if DEVELOPER has no access to ChooseProductsConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.DEVELOPER,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("ChooseProductsConfigurations")).toBe(
      false
    );
  });
});
