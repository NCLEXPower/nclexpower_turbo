import { createEnvironmentSchema } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/MaintenanceMode/validation";

describe("createEnvironmentSchema", () => {
  let environmentList: { id: number; label: string }[];
  let activeField: string | undefined;

  beforeEach(() => {
    environmentList = [
      { id: 1, label: "dev" },
      { id: 2, label: "uat" },
      { id: 3, label: "preprod" },
      { id: 4, label: "prod" },
    ];
  });

  // it("should generate the schema with correct fields based on the environment list", () => {
  //   const schema = createEnvironmentSchema(environmentList, undefined);

  //   expect(schema.fields).toHaveProperty("confirmationText_1");
  //   expect(schema.fields).toHaveProperty("confirmationText_2");
  //   expect(schema.fields).toHaveProperty("confirmationText_3");
  //   expect(schema.fields).toHaveProperty("confirmationText_4");
  // });

  // it("should validate the active field correctly with conditional validation", async () => {
  //   activeField = "confirmationText_1";
  //   const schema = createEnvironmentSchema(environmentList, activeField);

  //   const validValue = "Type DEV Environment";
  //   await expect(
  //     schema.validate({ confirmationText_1: validValue })
  //   ).resolves.toEqual({ confirmationText_1: validValue });

  //   const invalidValue = "Some other value"; // Incorrect format
  //   await expect(
  //     schema.validate({ confirmationText_1: invalidValue })
  //   ).rejects.toThrowError('Text must match: "Type DEV Environment"');
  // });

  it("", () => {});
});
