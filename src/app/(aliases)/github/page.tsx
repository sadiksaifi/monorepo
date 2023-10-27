import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export default async function Github() {
  redirect(siteConfig.links.github);
}
