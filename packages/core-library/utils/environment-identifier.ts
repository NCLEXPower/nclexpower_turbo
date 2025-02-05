export function sanitizedEnvironment(environment: number | undefined) {
  return environment === 0
    ? "dev"
    : environment === 1
      ? "uat"
      : environment === 2
        ? "preprod"
        : "prod";
}
