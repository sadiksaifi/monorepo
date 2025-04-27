// eslint-disable-next-line @typescript-eslint/no-unused-vars
const envVars = [
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "DATABASE_URL",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "CLIENT_ORIGIN",
  "AWS_SES_ACCESS_ID",
  "AWS_SES_SECRET_ACCESS_KEY",
  "AWS_SES_REGION",
  "AWS_SES_SENDER_NAME",
  "AWS_SES_SENDER_ADDRESS",
  "AWS_SES_REPLY_TO",
  "NEXT_PUBLIC_DATABASE_URL",
] as const;

type EnvVars = Record<(typeof envVars)[number], string>;

// function validateEnv(): EnvVars {
//   const env = process.env;
//   const validatedEnv = {} as EnvVars;

//   for (const key of envVars) {
//     const value = env[key];
//     if (!value) {
//       throw new Error(`${key} is not set`);
//     }
//     validatedEnv[key] = value;
//   }

//   return validatedEnv;
// }

// const env = validateEnv();
const env = process.env as unknown as EnvVars;

export default env;
