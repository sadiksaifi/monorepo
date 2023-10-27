import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export default async function X() {
  redirect(siteConfig.links.x);
}
