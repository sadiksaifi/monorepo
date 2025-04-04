interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({
  name,
  email,
  message,
}: EmailTemplateProps): React.ReactNode {
  return (
    <div>
      <p>{name} sent you a message from your website.</p>
      <div>
        <p>
          <strong>Message:</strong>
        </p>
        <p>{message}</p>
      </div>
      <p>
        <strong>Reply to:</strong> {email}
      </p>
    </div>
  );
}

// import * as React from 'react';
// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Preview,
//   Section,
//   Text,
//   Tailwind,
// } from '@react-email/components';

// const ContactFormEmail = ({
//   name = "John Doe",
//   email = "johndoe@example.com",
//   message = "Hello, I'm interested in discussing a potential project. Looking forward to connecting with you soon!"
// }) => {
//   return (
//     <Html>
//       <Tailwind>
//         <Head />
//         <Preview>Message from {name} via sadiksaifi.dev</Preview>
//         <Body className="bg-[#f5f5f7] font-sans py-[40px]">
//           <Container className="bg-white mx-auto my-0 max-w-[560px] rounded-[12px] overflow-hidden">
//             <Section className="pt-[32px] px-[32px] pb-[24px]">
//               {/* Logo Section */}
//               <Section className="text-center mb-[32px]">
//                 <Text className="text-[#1d1d1f] text-[20px] font-medium m-0">
//                   S
//                 </Text>
//               </Section>
              
//               <Heading className="text-[22px] font-medium text-[#1d1d1f] mt-0 mb-[16px] text-center">
//                 New message from your portfolio
//               </Heading>
              
//               <Text className="text-[15px] leading-[24px] text-[#1d1d1f] mb-[32px] text-center">
//                 {name} has sent you a message through sadiksaifi.dev
//               </Text>
              
//               <Hr className="border border-solid border-[#e6e6e6] my-[24px] mx-0" />
              
//               <Section className="mb-[24px]">
//                 <Text className="text-[17px] font-medium text-[#1d1d1f] mb-[12px]">
//                   From
//                 </Text>
                
//                 <Section className="bg-[#f5f5f7] rounded-[8px] p-[16px] mb-[16px]">
//                   <Text className="text-[15px] text-[#1d1d1f] m-0">
//                     {name}
//                   </Text>
//                   <Text className="text-[13px] text-[#86868b] mt-[4px] mb-0">
//                     {email}
//                   </Text>
//                 </Section>
//               </Section>
              
//               <Section className="mb-[32px]">
//                 <Text className="text-[17px] font-medium text-[#1d1d1f] mb-[12px]">
//                   Message
//                 </Text>
                
//                 <Section className="bg-[#f5f5f7] rounded-[8px] p-[16px]">
//                   <Text className="text-[15px] text-[#1d1d1f] m-0 whitespace-pre-wrap leading-[22px]">
//                     {message}
//                   </Text>
//                 </Section>
//               </Section>
              
//               <Section className="text-center my-[32px]">
//                 <Button
//                   href={`mailto:${email}?subject=Re: Your message from sadiksaifi.dev&body=Hello ${name},%0D%0A%0D%0AThank you for reaching out through my portfolio website.%0D%0A%0D%0ABest regards,%0D%0ASadik Saifi`}
//                   className="bg-[#0071e3] text-white font-medium py-[12px] px-[22px] rounded-[980px] text-[15px] no-underline text-center box-border"
//                 >
//                   Reply
//                 </Button>
//               </Section>
//             </Section>
            
//             <Section className="bg-[#f5f5f7] px-[32px] py-[16px]">
//               <Text className="text-[12px] text-[#86868b] m-0 text-center">
//                 This is an automated message from sadiksaifi.dev
//               </Text>
//               <Text className="text-[12px] text-[#86868b] mt-[4px] mb-0 text-center">
//                 © {new Date().getFullYear()} Sadik Saifi
//               </Text>
//             </Section>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// ContactFormEmail.PreviewProps = {
//   name: "John Doe",
//   email: "johndoe@example.com",
//   message: "Hello Sadik, I was impressed by your portfolio and would love to discuss a potential collaboration on an upcoming project. Your design sensibilities align perfectly with what we're looking for. Could we schedule a call sometime this week?"
// };

// export default ContactFormEmail;