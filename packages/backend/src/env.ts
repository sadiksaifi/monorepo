import "dotenv/config";
const envVars = [
  "PORT",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "DATABASE_URL",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "CLIENT_ORIGIN",
] as const;

type EnvVars = Record<(typeof envVars)[number], string>;

const validateEnv = (): EnvVars => {
  const env = process.env;
  const validatedEnv = {} as EnvVars;

  for (const key of envVars) {
    const value = env[key];
    if (!value) {
      throw new Error(`${key} is not set`);
    }
    validatedEnv[key] = value;
  }

  return validatedEnv;
};

const env = validateEnv();

export default env;
