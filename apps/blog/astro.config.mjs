import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import robotsTxt from "astro-robots-txt";
import sitemap from "astro-sitemap";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: true
  },
  site: "https://blog.sadiksaifi.dev",
  integrations: [
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
          },
        ],
      ],
    }),
    sitemap(),
    robotsTxt(),
    tailwind({ applyBaseStyles: false }),
  ],
  viewTransitions: true,
});
