import { createFileRoute } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";
export const Route = createFileRoute("/calc")({
  component: RouteComponent,
});

function RouteComponent() {
  const [result, setResult] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const number1 = formData.get("number1");
    const number2 = formData.get("number2");
    const res = Number(number1) + Number(number2);
    setResult(res);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calculator</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="number1">Enter a number</Label>
          <Input id="number1" name="number1" type="number" placeholder="Enter a number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="number2">Enter second number</Label>
          <Input id="number2" name="number2" type="number" placeholder="Enter second number" required />
        </div>
        <Button type="submit">Calculate</Button>
        <div className={cn(buttonVariants({variant: "secondary"}))}>
          Result: {result}
        </div>
      </form>
    </div>
  );
}
