import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useQueryState } from "nuqs";
import { QRFormWrapper } from "./qr-form-wrapper";
import { useMemo } from "react";
import { Label } from "@workspace/ui/components/label";

type Data = {
  phone: string;
  message: string;
};

export const SMS = () => {
  const [data, setData] = useQueryState<Data>("data", {
    defaultValue: {
      phone: "",
      message: "",
    },
    parse: (value) => JSON.parse(value) as Data,
    serialize: (value) => JSON.stringify(value),
  });

  const smsUrl = useMemo(() => {
    const encodedMessage = encodeURIComponent(data.message);
    return `sms:${data.phone}?body=${encodedMessage}`;
  }, [data]);

  return (
    <QRFormWrapper
      data={data}
      setData={setData}
      generateUrl={() => smsUrl}
      validateData={(data) => !!data.phone}
      errorMessage="Phone number is required"
    >
      <Label className="mb-2">Enter SMS Details</Label>
      <Input
        name="phone"
        placeholder="Enter phone number"
        type="tel"
        value={data.phone}
        onChange={(e) => setData({ ...data, phone: e.target.value })}
        autoFocus
      />
      <Textarea
        className="h-40 resize-none"
        name="message"
        placeholder="Enter message"
        value={data.message}
        onChange={(e) => setData({ ...data, message: e.target.value })}
      />
    </QRFormWrapper>
  );
};
