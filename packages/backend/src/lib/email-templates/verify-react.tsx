// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const WelcomeEmail = ({
  username = "Valued Customer",
  verificationUrl = "https://kin-technology-crm.com/verify",
}) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Kin Technology | CRM - Verify Your Account</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-[40px] bg-white p-[20px] rounded-[8px] shadow-sm max-w-[600px]">
            {/* Logo Section */}
            <Section className="mt-[32px] text-center">
              <Img
                src="https://new.email/static/app/placeholder.png?height=60&width=200"
                alt="Kin Technology | CRM Logo"
                className="w-full h-auto object-cover max-w-[200px] mx-auto"
              />
            </Section>

            {/* Welcome Header */}
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-gray-800 text-center">
                Welcome to Kin Technology | CRM!
              </Heading>
            </Section>

            {/* Welcome Message */}
            <Section className="mt-[24px]">
              <Text className="text-[16px] leading-[24px] text-gray-700">
                Hello {username},
              </Text>
              <Text className="text-[16px] leading-[24px] text-gray-700">
                You have been invited to Kin Technology | CRM! We're excited to have you
                on board and can't wait to help you streamline your customer relationship
                management experience.
              </Text>
              <Text className="text-[16px] leading-[24px] text-gray-700">
                Our platform is designed to help you manage customer interactions, track
                sales opportunities, and boost your team's productivity with powerful yet
                intuitive tools.
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="mt-[32px] text-center">
              <Text className="text-[16px] leading-[24px] text-gray-700 mb-[16px]">
                To get started, please verify your account by clicking the button below:
              </Text>
              <Button
                className="bg-blue-600 text-white font-bold py-[12px] px-[24px] rounded-[4px] no-underline text-center box-border"
                href={verificationUrl}
              >
                Verify My Account
              </Button>
            </Section>

            {/* Next Steps */}
            <Section className="mt-[32px]">
              <Text className="text-[16px] leading-[24px] text-gray-700 font-bold">
                Next Steps:
              </Text>
              <Text className="text-[14px] leading-[22px] text-gray-700 ml-[16px]">
                <strong>1.</strong> Download your credentials after clicking the link
                above. You'll land on a page where you can download your login
                credentials.
              </Text>
              <Text className="text-[14px] leading-[22px] text-gray-700 ml-[16px]">
                <strong>2.</strong> Use these credentials to log in and start using the
                CRM.
              </Text>
              <Text className="text-[14px] leading-[22px] text-gray-700 ml-[16px]">
                <strong>3.</strong> (Optional) You can go to Settings to change your
                password if you prefer.
              </Text>
            </Section>

            {/* Support Information */}
            <Section className="mt-[32px]">
              <Text className="text-[16px] leading-[24px] text-gray-700">
                If you have any questions or need assistance, our support team is here to
                help. Simply reply to this email or contact us at
                support@kintechnology.com.
              </Text>
              <Text className="text-[16px] leading-[24px] text-gray-700 mt-[16px]">
                We look forward to helping you grow your business!
              </Text>
              <Text className="text-[16px] leading-[24px] text-gray-700 font-bold mt-[16px]">
                The Kin Technology Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-[48px] pt-[24px] border-t border-gray-300">
              <Text className="text-[12px] leading-[16px] text-gray-500 text-center m-0">
                © {new Date().getFullYear()} Kin Technology | CRM. All rights reserved.
              </Text>
              <Text className="text-[12px] leading-[16px] text-gray-500 text-center m-0">
                A-121, Sector 63, Noida, Uttar Pradesh, India
              </Text>
              <Text className="text-[12px] leading-[16px] text-gray-500 text-center mt-[8px]">
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>{" "}
                •{" "}
                <Link href="#" className="text-gray-500 underline">
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  username: "John Doe",
  verificationUrl: "https://kin-technology-crm.com/verify/user123",
};

export default WelcomeEmail;
