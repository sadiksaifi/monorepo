// Comments Configuration
// Choose your preferred commenting system and configure it here

export const COMMENTS_CONFIG = {
  // Choose your commenting system: 'giscus', 'utterances', 'disqus', or 'none'
  system: "giscus" as "giscus" | "utterances" | "disqus" | "none",

  // Giscus Configuration (GitHub Discussions)
  giscus: {
    repo: "sadiksaifi/monorepo", // Your monorepo repository
    repoId: "R_kgDOJI9G9Q", // Your actual repo ID
    category: "Announcements",
    categoryId: "DIC_kwDOJI9G9c4Ctejz", // Your actual category ID
    mapping: "pathname", // This will create discussions based on blog post URLs
    strict: "0",
    reactionsEnabled: "0",
    emitMetadata: "0",
    inputPosition: "bottom", // Changed to bottom as per your preference
    theme: "preferred_color_scheme", // or 'light', 'dark', 'dark_dimmed', 'dark_high_contrast', 'light_high_contrast', 'light_colorblind', 'dark_colorblind', 'light_tritanopia', 'dark_tritanopia'
    lang: "en",
  },

  // Utterances Configuration (GitHub Issues)
  utterances: {
    repo: "sadiksaifi/monorepo", // Your monorepo repository
    issueTerm: "pathname", // or 'url', 'title', 'og:title'
    label: "comment",
    theme: "preferred-color-scheme", // or 'github-light', 'github-dark', 'github-dark-orange', 'icy-dark', 'dark-blue', 'photon-dark', 'boxy-light', 'gruvbox-dark'
  },

  // Disqus Configuration
  disqus: {
    shortname: "YOUR_DISQUS_SHORTNAME",
    identifier: "pathname", // or 'url', 'title'
    url: "window.location.href",
    title: "document.title",
  },
};

// Helper function to get current page info
export function getPageInfo() {
  if (typeof window !== "undefined") {
    return {
      pathname: window.location.pathname,
      url: window.location.href,
      title: document.title,
    };
  }
  return {
    pathname: "",
    url: "",
    title: "",
  };
}
