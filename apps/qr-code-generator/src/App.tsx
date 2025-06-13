import { TabNavigation } from "@workspace/ui/components/tab-navigation";
import { Download, Loader, Slash } from "./lib/component/icons";
import { Url } from "./lib/component/url";
import { useQueryState } from "nuqs";
import { Button } from "@workspace/ui/components/button";
import { useDownloadQR } from "./lib/hook/useDownloadQr";
import { Text } from "./lib/component/text";
import { Email } from "./lib/component/email";
import { useCallback, useRef, useState } from "react";
import { Contact } from "./lib/component/contact";
import { SMS } from "./lib/component/sms";
import { WhatsApp } from "./lib/component/whatsapp";

const QR_CODE_TYPES = {
  URL: "URL",
  TEXT: "TEXT",
  EMAIL: "EMAIL",
  CONTACT: "CONTACT",
  SMS: "SMS",
  WHATSAPP: "WHATSAPP",
} as const;

const navigation = Object.entries(QR_CODE_TYPES).map(([key, value]) => ({
  label: value,
  type: key.toLowerCase(),
}));

export function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const SCREENS = {
    [QR_CODE_TYPES.URL]: <Url />,
    [QR_CODE_TYPES.TEXT]: <Text />,
    [QR_CODE_TYPES.EMAIL]: <Email />,
    [QR_CODE_TYPES.CONTACT]: <Contact />,
    [QR_CODE_TYPES.SMS]: <SMS />,
    [QR_CODE_TYPES.WHATSAPP]: <WhatsApp />,
  };
  const [searchParams, setSearchParams] = useQueryState("type", {
    defaultValue: navigation[0].type,
  });
  const [svgData, setSvgData] = useQueryState("svg-data");
  const [data, setData] = useQueryState("data");

  const cleanQueryState = useCallback(() => {
    setSvgData("");
    setData("");
  }, [setData, setSvgData]);

  const { isPending: isDownloadPending, mutate: handleDownload } = useDownloadQR();

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    const form = formRef.current?.querySelector("form");
    form?.requestSubmit();
    setTimeout(() => setIsGenerating(false), 1000);
  }, []);

  return (
    <div className="flex items-center flex-col justify-center md:h-screen bg-background">
      <h1 className="scroll-m-20 text-transparent md:text-foreground text-4xl font-extrabold tracking-tight lg:text-5xl">
        QR Code Generator
      </h1>
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-1.5 md:gap-4 md:p-8 md:py-24 py-12">
        <div className="flex flex-col gap-4">
          <TabNavigation.Root className="flex-1">
            <TabNavigation.List className="max-w-full md:flex-nowrap flex-wrap px-2 md:px-0 md:justify-start justify-center md:gap-0 gap-y-2 py-2 md:py-0">
              {navigation.map((item) => (
                <TabNavigation.Item
                  key={item.label}
                  active={searchParams === item.type}
                  asChild
                >
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setSearchParams(item.type);
                      cleanQueryState();
                    }}
                  >
                    {item.label}
                  </button>
                </TabNavigation.Item>
              ))}
            </TabNavigation.List>

            <TabNavigation.Content>
              <div ref={formRef}>
                {SCREENS[searchParams.toUpperCase() as keyof typeof SCREENS]}
              </div>
            </TabNavigation.Content>
          </TabNavigation.Root>
        </div>

        <div className="flex md:flex-col flex-col-reverse gap-10 md:gap-2">
          <div className="md:p-4 *:size-[90vw] md:*:size-[350px] *:flex *:items-center *:justify-center bg-background shadow-lg flex items-center justify-center *:border *:border-gray-200 *:p-2 rounded-md *:rounded-md">
            {isDownloadPending ? (
              <div className="gap-4 text-muted-foreground flex-col">
                <Loader className="size-20 animate-spin" />
                Downloading...
              </div>
            ) : svgData ? (
              <div dangerouslySetInnerHTML={{ __html: svgData }} />
            ) : (
              <div className="gap-4 text-muted-foreground flex-col">
                <Slash className="size-20" />
                No QR Code Available
              </div>
            )}
          </div>
          <div className="flex gap-1.5">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !data}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader className="size-4" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
            <Button
              variant="success"
              size="icon"
              disabled={!svgData || isDownloadPending}
              onClick={() => handleDownload(svgData ?? "")}
            >
              {isDownloadPending ? (
                <Loader className="size-4" />
              ) : (
                <Download className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
