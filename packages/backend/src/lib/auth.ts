import env from "../env";
import { db } from "../lib/db";
import { verifyAccountTemplate } from "../lib/email-templates/verify";
import { sendEmail } from "../lib/utils/email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { username } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    debugLogs: true,
  }),
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.CLIENT_ORIGIN],
  baseURL: env.BETTER_AUTH_URL,
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
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
  plugins: [
    openAPI(),
    passkey({
      rpID: process.env.NODE_ENV === "development" ? "localhost" : env.RP_ID,
    }),
    username({
      minUsernameLength: 3,
      maxUsernameLength: 20,
      usernameValidator: (username) => {
        if (username === "admin") {
          return false;
        }
        return true;
      },
    }),
  ],
});
