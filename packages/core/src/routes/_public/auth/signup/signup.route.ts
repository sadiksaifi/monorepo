import { Router } from "express";
import Auth from "~/lib/auth";
import { setCookies } from "~/lib/cookies";
import db from "~/lib/db";
import EmailService from "~/lib/email";
import emailVerificationTemplate from "~/templates/email-verification";

const router = Router();
const auth = new Auth();
const emailService = new EmailService();

router.post("/auth/signup", async (req, res) => {
  try {
    const { password, name } = req.body;
    const email = (req.body.email as string).toLowerCase();

    if (!email || !password || !name) {
      res
        .status(400)
        .send({ message: "Email, password, and name are required!" });
      return;
    }

    if (await db.user.findUnique({ where: { email } })) {
      res.status(400).send({ message: "User already exists!" });
      return;
    }

    const hashedPassword = await auth.hashPassword(password);
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const otp = auth.generateOtp();
    await db.userVerification.create({
      data: {
        email,
        otp,
      },
    });
    await emailService.send({
      recipient: email,
      subject: `OTP ${otp}`,
      message: emailVerificationTemplate("Sadik Saifi", otp),
    });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

export default router;
