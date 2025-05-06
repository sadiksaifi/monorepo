import { Label } from "@workspace/ui/components/label";
import { useQueryState } from "nuqs";
import { Textarea } from "@workspace/ui/components/textarea";
import { QRFormWrapper } from "./qr-form-wrapper";

export const Text = () => {
  const [data, setData] = useQueryState("data", {
    defaultValue: "",
  });

  return (
    <QRFormWrapper
      data={data}
      setData={setData}
      generateUrl={(text) => text}
      validateData={(text) => !!text}
      errorMessage="Text is required"
    >
      <Label className="mb-2" htmlFor="text">
        Enter Text
      </Label>
      <Textarea
        id="text"
        name="text"
        placeholder="Enter Text"
        className="resize-none h-40"
        value={data}
        onChange={(e) => setData(e.target.value)}
        autoFocus
      />
    </QRFormWrapper>
  );
};
