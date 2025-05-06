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

export const WhatsApp = () => {
  const [data, setData] = useQueryState<Data>("data", {
    defaultValue: {
      phone: "",
      message: "",
    },
    parse: (value) => JSON.parse(value) as Data,
    serialize: (value) => JSON.stringify(value),
  });

  const whatsappUrl = useMemo(() => {
    // Remove any non-numeric characters from phone number
    const cleanPhone = data.phone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(data.message);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }, [data]);

  return (
    <QRFormWrapper
      data={data}
      setData={setData}
      generateUrl={() => whatsappUrl}
      validateData={(data) => !!data.phone}
      errorMessage="Phone number is required"
    >
      <Label className="mb-2">Enter WhatsApp Message Details</Label>
      <Input
        name="phone"
        placeholder="Enter phone number (with country code, e.g. 911234567890)"
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
