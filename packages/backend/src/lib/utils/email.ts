import type { EmailSendParams } from "../../lib/ses";
import env from "../../env";
import EmailService from "../../lib/ses";

export async function sendEmail(params: EmailSendParams) {
  const emailService = new EmailService({
    senderAddress: env.AWS_SES_SENDER_ADDRESS,
    senderName: env.AWS_SES_SENDER_NAME,
    replyTo: env.AWS_SES_REPLY_TO,
    accessKeyId: env.AWS_SES_ACCESS_ID,
    secretAccessKey: env.AWS_SES_SECRET_ACCESS_KEY,
    region: env.AWS_SES_REGION,
  });
  const res = await emailService.send(params);
  return res;
}
