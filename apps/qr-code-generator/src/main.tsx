import "@workspace/ui/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeProvider } from "@workspace/ui/components/theme-provider/vite";
import { Header } from "./lib/component/header";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <ThemeProvider>
        <Header />
        <App />
      </ThemeProvider>
    </NuqsAdapter>
  </StrictMode>,
);
