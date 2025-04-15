import { SendEmailCommandInput, SES, SESClientConfig } from "@aws-sdk/client-ses";
import { tryCatch } from "./try-catch";
import { error } from "console";
export type EmailSendParams = {
  recipient: string;
  subject: string;
  message: string;
};

export type EmailServiceConfig = {
  senderAddress: string;
  senderName: string;
  replyTo: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
};

class EmailService {
  #AWS_SES_SENDER_ADDRESS: string;
  #AWS_SES_SENDER_NAME: string;
  #AWS_SES_REPLY_TO: string;
  #AWS_SES_ACCESS_KEY_ID: string;
  #AWS_SES_SECRET_ACCESS_KEY: string;
  #AWS_SES_REGION: string;
  #AWS_SES_CONFIG: SESClientConfig;
  #AWS_SES: SES;

  constructor({
    senderAddress,
    senderName,
    replyTo,
    accessKeyId,
    secretAccessKey,
    region,
  }: EmailServiceConfig) {
    this.#AWS_SES_SENDER_ADDRESS = senderAddress;
    this.#AWS_SES_SENDER_NAME = senderName;
    this.#AWS_SES_REPLY_TO = replyTo;
    this.#AWS_SES_ACCESS_KEY_ID = accessKeyId;
    this.#AWS_SES_SECRET_ACCESS_KEY = secretAccessKey;
    this.#AWS_SES_REGION = region;

    this.#AWS_SES_CONFIG = {
      credentials: {
        accessKeyId: this.#AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: this.#AWS_SES_SECRET_ACCESS_KEY,
      },
      region: this.#AWS_SES_REGION,
    };

    this.#AWS_SES = new SES(this.#AWS_SES_CONFIG);
  }

  async send({ recipient, subject, message }: EmailSendParams) {
    const params: SendEmailCommandInput = {
      Source: `${this.#AWS_SES_SENDER_NAME} <${this.#AWS_SES_SENDER_ADDRESS}>`,
      Destination: {
        ToAddresses: [recipient],
      },
      ReplyToAddresses: [this.#AWS_SES_REPLY_TO],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };

    console.log("Sending email...", this.#AWS_SES_REGION);
    const res = await tryCatch(this.#AWS_SES.sendEmail(params));
    console.log("Email sent successfully!", res);
    return {
      error: res.error,
      data: res.data?.MessageId,
    };
  }
}

export default EmailService;
