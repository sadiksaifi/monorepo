import { useMutation } from "@/lib/hook/useMutation";

export const useDownloadQR = () =>
  useMutation(async (svgData?: string) => {
    if (!svgData) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create an image from the SVG
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Create a canvas to convert SVG to PNG
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        const ctx = canvas.getContext("2d");
        // Draw image at full canvas size
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to PNG blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Failed to create PNG blob"));
            return;
          }

          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "qr-code.png";
          a.click();
          URL.revokeObjectURL(a.href);
          URL.revokeObjectURL(url);
          resolve(undefined);
        }, "image/png");
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load SVG"));
      };

      img.src = url;
    });
  });
