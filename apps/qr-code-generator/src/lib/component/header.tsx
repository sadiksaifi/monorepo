import { ThemeToggle } from "@workspace/ui/components/theme-toggle/vite";
import { Button } from "@workspace/ui/components/button";

export function Header() {
  return (
    <header className="flex md:justify-around justify-between p-4 z-50 items-center font-mono w-full fixed top-0 left-0 bg-background/40 backdrop-blur-md h-16">
      <Button variant="link" asChild>
        <a href="https://sadiksaifi.dev" target="_blank">@qr-generator</a>
      </Button>
      <div className="flex items-center justify-end gap-2">
        <ThemeToggle dropdown={false} />
      </div>
    </header>
  );
}
