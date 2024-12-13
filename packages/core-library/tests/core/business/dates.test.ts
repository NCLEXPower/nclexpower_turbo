import {
  formatDate,
  formatTime,
  isValidDate,
  rawDateFromISOString,
} from "../../../core";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

describe("Business dates logic", () => {
  describe("formatDate", () => {
    test("should return correct date string", () => {
      expect(formatDate("2021-06-14T00:00:00+00:00")).toBe("14 Jun 2021");
      expect(formatDate("14 June 2021")).toBe("14 06 2021");
    });
  });

  describe("formatTime", () => {
    it("should format time", () => {
      const date = new Date("Fri, 25 Mar 2022 15:07:08 GMT+2");
      const normalizedDate = new Date(
        date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)
      );
      const hours =
        normalizedDate.getHours() < 10
          ? `0${normalizedDate.getHours()}`
          : normalizedDate.getHours();
      const minutes =
        normalizedDate.getMinutes() < 10
          ? `0${normalizedDate.getMinutes()}`
          : normalizedDate.getMinutes();
      expect(formatTime(normalizedDate)).toBe(`${hours}:${minutes}`);
    });
  });

  describe("isValidDate", () => {
    it("undefined should be an invalid date", () => {
      const mockDate = undefined;
      expect(isValidDate(mockDate as unknown as Date)).toBe(false);
    });

    it("current Date should be valid date", () => {
      expect(isValidDate(new Date())).toBe(true);
    });
  });

  describe("rawDateFromISOString", () => {
    test("should return correct date string", () => {
      expect(rawDateFromISOString("2021-06-14T00:00:00+00:00")).toBe(
        "14 Jun 2021"
      );
    });
  });
});
