import { redirect } from "next/navigation";
import { siteConfig } from "@/config/site";

export default async function Mail() {
  redirect(siteConfig.links.mail);
}
