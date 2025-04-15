import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import env from "@/env";
import { sendEmail } from "./utils/email";
import { verifyAccountTemplate } from "./email-templates/verify";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: [env.CLIENT_ORIGIN],
  baseURL: env.BETTER_AUTH_URL,
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        recipient: user.email,
        subject: "Reset your password",
        message: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        recipient: user.email,
        subject: "Verify your account",
        message: verifyAccountTemplate({
          name: user.name,
          verificationLink: url,
        }),
      });
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
    },
  },
  plugins: [openAPI()],
});
