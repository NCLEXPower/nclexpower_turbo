/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as yup from "yup";

export const createEnvironmentSchema = (
  environmentList: string[],
  activeField?: string | null
) => {
  const fields = environmentList.reduce(
    (schema, env) => {
      const requiredText = `Type ${env.toUpperCase()} Environment`;

      schema[`confirmationText_${env}`] = yup
        .string()
        .test(
          "conditional-validation",
          "This field is required",
          function (value) {
            return activeField === `confirmationText_${env}` ? !!value : true;
          }
        )
        .test(
          "match-validation",
          `Text must match: "${requiredText}"`,
          function (value) {
            return activeField === `confirmationText_${env}`
              ? value === requiredText
              : true;
          }
        );

      return schema;
    },
    {} as Record<string, yup.StringSchema>
  );

  return yup.object().shape(fields);
};
