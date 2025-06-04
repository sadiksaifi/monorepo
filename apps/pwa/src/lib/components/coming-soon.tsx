import { toast } from "sonner";

export function ComingSoon() {
  toast.error("Coming soon!", {
    description: "Please be patient, we are working on it.",
  });
}
