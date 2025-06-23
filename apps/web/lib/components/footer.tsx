import { Separator } from "@workspace/ui/components/separator";
import { Copyright, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container flex flex-col gap-3 !py-6 items-center">
      <Separator className="h-1.5 rounded-full w-14" />
      <div className="xl:text-sm text-xs tracking-[-0.01] text-muted-foreground flex flex-col justify-center items-center gap-2">
        <p className="flex items-center gap-1">
          <Copyright className="mt-0.5" size={14} /> Copyright {currentYear}
        </p>
        <p className="flex items-center gap-1">
          Made with
          <Heart size={14} />
          by
          <strong className="font-medium text-primary">Sadik Saifi</strong>
        </p>
      </div>
    </footer>
  );
}
