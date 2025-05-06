import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useQueryState } from "nuqs";
import { QRFormWrapper } from "./qr-form-wrapper";

export const Url = () => {
  const [data, setData] = useQueryState("data", {
    defaultValue: "",
  });

  return (
    <QRFormWrapper
      data={data}
      setData={setData}
      generateUrl={(url) => url}
      validateData={(url) => !!url}
      errorMessage="URL is required"
    >
      <Label className="mb-2" htmlFor="url">
        Enter URL
      </Label>
      <Input
        id="url"
        name="url"
        placeholder="Enter URL"
        value={data}
        onChange={(e) => setData(e.target.value)}
        autoFocus
      />
    </QRFormWrapper>
  );
};
