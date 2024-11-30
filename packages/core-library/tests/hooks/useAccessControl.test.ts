import { useAccessControl } from "../../hooks/useAccessControl";
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

  it("should return false if ADMIN has no access to ChooseProductsConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.ADMIN,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("ChooseProductsConfigurations")).toBe(
      false
    );
  });

  it("should return true if ENCODER  has access to InAppManagement", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.ENCODER,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("InAppManagement")).toBe(true);
  });

  it("should return true if DEVELOPER has access to OtherConfigurations", () => {
    (useAccessLevel as jest.Mock).mockImplementation(() => [
      AccessLevels.DEVELOPER,
    ]);

    const { result } = renderHook(() => useAccessControl());
    expect(result.current.hasAccess("OtherConfigurations")).toBe(true);
  });
});
