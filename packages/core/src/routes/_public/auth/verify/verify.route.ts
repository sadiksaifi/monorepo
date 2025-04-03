import { Router } from "express";
import Auth from "~/lib/auth";
import { refreshTokenTTL, accessTokenTTL } from "~/utils/constants";
import db from "~/lib/db";
import EmailService from "~/lib/email";
import { setCookies } from "~/lib/cookies";
import emailVerificationTemplate from "~/templates/email-verification";

const router = Router();
const auth = new Auth();
const emailService = new EmailService();

router.post("/auth/verify", async (req, res) => {
  try {
    const { otp } = req.body;
    const email = (req.body.email as string).toLowerCase();

    if (!email || !otp) {
      res.status(400).send({ message: "Email and OTP are required!" });
      return;
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).send({ message: "Invalid email!" });
      return;
    }

    const userVerification = await db.userVerification.findFirst({
      where: { email: user.email, otp: otp },
    });

    if (!userVerification) {
      res.status(400).send({ message: "Invalid OTP!" });
      return;
    }

    const otpTTL = 1000 * 60 * 15;
    // const otpTTL = 1000;
    if (
      (userVerification.updatedAt.getTime() ||
        userVerification.createdAt.getTime()) +
        otpTTL <
      Date.now()
    ) {
      res.status(400).send({ message: "OTP has expired!" });
      return;
    }

    await db.user.update({
      where: { email: user.email },
      data: {
        isVerified: new Date().toISOString(),
      },
    });

    const session = await auth.createSession(user.id);

    if (!session) {
      res.status(500).send({ message: "Something went wrong!" });
      return;
    }

    const accessToken = await auth.generateJwtToken(
      { userId: session?.user.id },
      new Date(Date.now() + accessTokenTTL),
    );
    const refreshToken = await auth.generateJwtToken(
      { sessionId: session?.id },
      new Date(Date.now() + refreshTokenTTL),
    );

    setCookies(
      res,
      { "access-token": accessToken },
      { maxAge: accessTokenTTL },
    );
    setCookies(
      res,
      { "refresh-token": refreshToken },
      { maxAge: refreshTokenTTL },
    );

    await db.userVerification.delete({
      where: { email },
    });

    res.status(200).send();
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.post("/auth/verify/resend-otp", async (req, res) => {
  try {
    const email = (req.body.email as string).toLowerCase();
    const userVerification = await db.userVerification.findFirst({
      where: { email },
    });

    if (!userVerification) {
      res.status(400).send({ message: "Something went wrong!" });
      return;
    }

    const newOtp = auth.generateOtp();
    await db.userVerification.update({
      where: { id: userVerification.id },
      data: {
        otp: newOtp,
      },
    });
    await emailService.send({
      recipient: email,
      subject: `OTP ${newOtp}`,
      message: emailVerificationTemplate("Sadik Saifi", newOtp),
    });
    res.status(201).send({
      otp: newOtp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

export default router;
