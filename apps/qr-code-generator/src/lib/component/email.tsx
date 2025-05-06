import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useQueryState } from "nuqs";
import { QRFormWrapper } from "./qr-form-wrapper";
import { useMemo } from "react";
import { Label } from "@workspace/ui/components/label";

type Data = {
  email: string;
  subject: string;
  body: string;
};

export const Email = () => {
  const [data, setData] = useQueryState<Data>("data", {
    defaultValue: {
      email: "",
      subject: "",
      body: "",
    },
    parse: (value) => JSON.parse(value) as Data,
    serialize: (value) => JSON.stringify(value),
  });

  const mailTo = useMemo(() => {
    return `mailto:${data.email}?subject=${data.subject}&body=${data.body}`;
  }, [data]);

  return (
    <QRFormWrapper
      data={data}
      setData={setData}
      generateUrl={() => mailTo}
      validateData={(data) => !!data.email}
      errorMessage="Email is required"
    >
      <Label className="mb-2">Enter Email Details</Label>
      <Input
        name="email"
        placeholder="Enter email here"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        autoFocus
      />
      <Input
        name="subject"
        placeholder="Enter subject here"
        value={data.subject}
        onChange={(e) => setData({ ...data, subject: e.target.value })}
      />
      <Textarea
        className="h-40 resize-none"
        name="body"
        placeholder="Enter body here"
        value={data.body}
        onChange={(e) => setData({ ...data, body: e.target.value })}
      />
    </QRFormWrapper>
  );
};
