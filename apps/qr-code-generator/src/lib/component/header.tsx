import { ThemeToggle } from "@workspace/ui/components/theme-toggle/vite";
import { Button } from "@workspace/ui/components/button";

export function Header() {
  return (
    <header className="flex justify-around p-4 items-center font-mono w-full fixed top-0 left-0 right-0 bg-background">
      <Button variant="link" asChild>
        <a href="https://sadiksaifi.dev">@sadiksaifi</a>
      </Button>
      <div className="flex items-center justify-end gap-2">
        <ThemeToggle dropdown={false} />
      </div>
    </header>
  );
}
