/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { formatSectionTitle } from "../../utils/FormatSectionTitles";

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("formatSectionTitle", () => {
  it('should return "Default" when title is undefined', () => {
    expect(formatSectionTitle(undefined)).toBe("Default");
  });

  it('should return "CAT" when title is "cat"', () => {
    expect(formatSectionTitle("cat")).toBe("CAT");
  });

  it('should return "CAT" when title is "CAT"', () => {
    expect(formatSectionTitle("CAT")).toBe("CAT");
  });

  it("should format title correctly with hyphens and spaces", () => {
    expect(formatSectionTitle("med-cards")).toBe("Med Cards");
    expect(formatSectionTitle("content-cards")).toBe("Content Cards");
  });

  it("should format title correctly with mixed case", () => {
    expect(formatSectionTitle("mEd cArDs")).toBe("Med Cards");
  });

  it("should format single word title correctly", () => {
    expect(formatSectionTitle("document")).toBe("Document");
  });
});
