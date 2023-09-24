interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <p>Hey Sadik Saifi, you have got a new message from {name}!</p>
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
