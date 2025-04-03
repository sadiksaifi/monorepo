import { buttonVariants } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-12rem)] flex justify-center items-center flex-col gap-4">
      <h2>404 | Not Found</h2>
      <Link
        className={cn(buttonVariants(), "flex items-center gap-2")}
        href="/"
      >
        <Undo2 className="h-4 w-4 mb-0.5" />
        Go To Home
      </Link>
    </main>
  );
}
