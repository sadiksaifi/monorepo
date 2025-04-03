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
