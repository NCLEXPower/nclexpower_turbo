/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import * as yup from "yup";

export const createEnvironmentSchema = (
  environmentList: { id: number; label: string }[],
  activeField: string | undefined
) => {
  const fields = environmentList.reduce(
    (schema, env) => {
      const requiredText = `Type ${env.label.toUpperCase()} Environment`;

      schema[`confirmationText_${env.id}`] = yup
        .string()
        .test(
          "conditional-validation",
          "This field is required",
          function (value) {
            return activeField === `confirmationText_${env.id}`
              ? !!value
              : true;
          }
        )
        .test(
          "match-validation",
          `Text must match: "${requiredText}"`,
          function (value) {
            return activeField === `confirmationText_${env.id}`
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
