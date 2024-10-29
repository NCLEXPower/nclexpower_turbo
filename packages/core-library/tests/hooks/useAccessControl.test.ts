import { useAccessControl } from "../../hooks";
import { AccessLevels } from "../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/permission";
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

  it("should return false when access level is undefined", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [undefined]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("ChooseProductsConfigurations")).toBe(false);
  });

  it("should return true if ADMIN has access to ChooseProductsConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [AccessLevels.ADMIN]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("ChooseProductsConfigurations")).toBe(true);
  });

  it("should return false if ENCODER does not have access to InAppManagement", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [AccessLevels.ENCODER]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("InAppManagement")).toBe(false);
  });

  it("should return true if DEVELOPER has access to OtherConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [AccessLevels.DEVELOPER]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("OtherConfigurations")).toBe(true);
  });
});