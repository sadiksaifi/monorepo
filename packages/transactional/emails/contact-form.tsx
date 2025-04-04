import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
} from "@react-email/components";

const ContactFormEmail = ({
  name = "John Doe",
  email = "johndoe@example.com",
  message = "Hello, I'm interested in discussing a potential project. Looking forward to connecting with you soon!",
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Message from {name} via sadiksaifi.dev</Preview>
        <Body className="bg-[#f5f5f7] font-sans py-[40px]">
          <Container className="bg-white mx-auto my-0 max-w-[560px]">
            <Section className="pt-[32px] px-[32px] pb-[24px]">
              <Heading className="mb-[12px]">
                return <Img src="" alt="sdk-logo" width="60" height="60" />;
                <Text className="text-[24px] font-bold text-[#1d1d1f] mt-[16px]">
                  New Message
                </Text>
              </Heading>

              <Hr />

              <Section className="mb-[12px]">
                <Text className="text-[17px] font-medium text-[#1d1d1f] mb-[12px]">
                  From
                </Text>

                <Section className="bg-[#f5f5f7] p-[16px]">
                  <Text className="text-[15px] text-[#1d1d1f] m-0">{name}</Text>
                  <Text className="text-[13px] text-[#86868b] mt-[4px] mb-0">
                    {email}
                  </Text>
                </Section>
              </Section>

              <Section className="mb-[32px]">
                <Text className="text-[17px] font-medium text-[#1d1d1f] mb-[12px]">
                  Message
                </Text>

                <Section className="bg-[#f5f5f7] p-[16px]">
                  <Text className="text-[15px] text-[#1d1d1f] m-0 leading-[22px]">
                    {message}
                  </Text>
                </Section>
              </Section>

              <Section className="mb-[32px]">
                <Button
                  href={`mailto:${email}?subject=Re: Your message from sadiksaifi.dev&body=Hello ${name},%0D%0A%0D%0AThank you for reaching out through my portfolio website.%0D%0A%0D%0ABest regards,%0D%0ASadik Saifi`}
                  className="bg-black text-white py-[10px] px-[22px] text-[15px] text-center"
                >
                  Reply
                </Button>
              </Section>
            </Section>

            <Section className="bg-[#f5f5f7] px-[32px] py-[16px]">
              <Text className="text-[12px] text-[#86868b] m-0 text-center">
                This is an automated message from sadiksaifi.dev
              </Text>
              <Text className="text-[12px] text-[#86868b] mt-[4px] mb-0 text-center">
                © {new Date().getFullYear()} Sadik Saifi
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ContactFormEmail.PreviewProps = {
  name: "John Doe",
  email: "johndoe@example.com",
  message:
    "Hello Sadik, I was impressed by your portfolio and would love to discuss a potential collaboration on an upcoming project. Your design sensibilities align perfectly with what we're looking for. Could we schedule a call sometime this week?",
};

export default ContactFormEmail;
