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
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 1080 1080"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_401_7)">
                    <rect width="1080" height="1080" rx="107" fill="black" />
                    <path
                      d="M182 713.5V642.5H291C308 636 297.5 617.5 291 618C284.5 618.5 276.9 618.9 268.5 618.5C260.1 618.1 250.667 616.333 247 615.5C232.2 611.9 218.167 601.333 213 596.5C199.667 585.667 176.5 552.9 190.5 508.5C204.5 464.1 244.667 451.667 263 451H364.5V523H268C252.5 525 256.5 546 268 547H294C322 550 378 572 370.5 640.5C364.5 695.3 317 712 294 713.5H182Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M575 341V472.626C556.572 462.608 535.45 456.917 513 456.917C441.203 456.917 383 515.12 383 586.917C383 658.714 441.203 716.917 513 716.917C584.797 716.917 643 658.714 643 586.917C643 585.243 642.968 583.576 642.906 581.917H643V363.449L575 341ZM513 648.917C547.242 648.917 575 621.159 575 586.917C575 552.676 547.242 524.917 513 524.917C478.758 524.917 451 552.676 451 586.917C451 621.159 478.758 648.917 513 648.917Z"
                      fill="white"
                    />
                    <path
                      d="M909.122 457.169L809.219 567.924L903.248 713L823.489 713L762.808 619.376L734 651.313V712H665V343H734V551.387L818.986 457.169L909.122 457.169Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_401_7">
                      <rect width="1080" height="1080" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
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
