import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export default async function LinkedIn() {
  redirect(siteConfig.links.linkedin);
}
