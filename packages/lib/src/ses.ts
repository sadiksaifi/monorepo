import {
  SendEmailCommandInput,
  SES,
  SESClientConfig,
} from "@aws-sdk/client-ses";

type EmailSendParams = {
  recipient: string;
  subject: string;
  message: string;
};

class EmailService {
  #AWS_SES_SENDER_ADDRESS = process.env.AWS_SES_SENDER_ADDRESS!;
  #AWS_SES_SENDER_NAME = process.env.AWS_SES_SENDER_NAME!;
  #AWS_SES_REPLY_TO = process.env.AWS_SES_REPLY_TO!;
  #AWS_SES_ACCESS_KEY_ID = process.env.AWS_SES_ACCESS_ID!;
  #AWS_SES_SECRET_ACCESS_KEY = process.env.AWS_SES_SECRET_ACCESS_KEY!;
  #AWS_SES_REGION = process.env.AWS_SES_REGION!;
  #AWS_SES_CONFIG: SESClientConfig = {
    credentials: {
      accessKeyId: this.#AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: this.#AWS_SES_SECRET_ACCESS_KEY,
    },
    region: this.#AWS_SES_REGION,
  };
  #AWS_SES = new SES(this.#AWS_SES_CONFIG);

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

    try {
      await this.#AWS_SES.sendEmail(params);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

const sendEmail = async (params: EmailSendParams) => {
  const emailService = new EmailService();
  return emailService.send(params);
};

export { EmailService, sendEmail };
