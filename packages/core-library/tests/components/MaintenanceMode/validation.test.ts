import { createEnvironmentSchema } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/MaintenanceMode/validation";

describe("createEnvironmentSchema", () => {
  let environmentList: string[];
  let activeField: string | undefined | null;

  beforeEach(() => {
    environmentList = ["dev", "uat", "preprod", "prod"];
  });

  it("should generate the schema with correct fields based on the environment list", () => {
    const schema = createEnvironmentSchema(environmentList, undefined);

    expect(schema.fields).toHaveProperty("confirmationText_dev");
    expect(schema.fields).toHaveProperty("confirmationText_uat");
    expect(schema.fields).toHaveProperty("confirmationText_preprod");
    expect(schema.fields).toHaveProperty("confirmationText_prod");
  });

  it("should validate the active field correctly with conditional validation", async () => {
    activeField = "confirmationText_dev";
    const schema = createEnvironmentSchema(environmentList, activeField);

    const validValue = "Type DEV Environment";
    await expect(
      schema.validate({ confirmationText_dev: validValue })
    ).resolves.toEqual({ confirmationText_dev: validValue });

    const invalidValue = "Some other value";
    await expect(
      schema.validate({ confirmationText_dev: invalidValue })
    ).rejects.toThrowError('Text must match: "Type DEV Environment"');
  });
});
