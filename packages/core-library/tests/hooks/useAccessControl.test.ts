import { useAccessControl } from "../../hooks";
import { AccessLevels } from "../../core/utils/permission";
import { renderHook } from "../common";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../contexts/auth/hooks", () => ({
  useAccessLevel: jest.fn(),
}));

const { useAccessLevel } = require("../../contexts/auth/hooks");

describe("useAccessControl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("should return true if ADMIN has access to ChooseProductsConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.ADMIN,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("ChooseProductsConfigurations")).toBe(true);
  });

  it("should return true if ENCODER  has access to InAppManagement", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.EDITOR,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("InAppManagement")).toBe(true);
  });

  it("should return true if DEVELOPER has access to OtherConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.VIEWER,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("OtherConfigurations")).toBe(true);
  });
});
