import { useQueryState } from "nuqs";
import { useMutation } from "../hook/useMutation";
import { renderSVG } from "uqr";
import type { ReactNode } from "react";

type QRFormWrapperProps<T> = {
  children: ReactNode;
  data: T;
  setData: (data: T) => void;
  generateUrl: (data: T) => string;
  validateData: (data: T) => boolean;
  errorMessage: string;
};

export function QRFormWrapper<T>({
  children,
  data,
  setData,
  generateUrl,
  validateData,
  errorMessage,
}: QRFormWrapperProps<T>) {
  const [, setSvgData] = useQueryState("svg-data", {
    defaultValue: "",
  });

  const { mutate } = useMutation(async () => {
    if (!validateData(data)) throw new Error(errorMessage);
    const url = generateUrl(data);
    const svg = renderSVG(url, {
      ecc: "M",
      border: 2,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSvgData(svg);
    setData(data);
    return data;
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(data);
      }}
      className="flex flex-col gap-2 md:p-6 p-4 pt-8 md:pt-6 md:h-[350px]"
    >
      {children}
    </form>
  );
}
