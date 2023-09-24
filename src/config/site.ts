export const siteConfig = {
  name: "Sadik Saifi",
  url: "https://sadiksaifi.dev",
  ogImage: "https://sadiksaifi.dev/og.jpg",
  description: "Sadik Saifi - Web Developer",
  links: {
    twitter: "https://twitter.com/thesadiksaifi",
    github: "https://github.com/sadiksaifi",
    linkedin: "https://www.linkedin.com/in/sadiksaifi",
    mail: "mailto:thesadiksaifi@gmail.com",
    navitems: [
      {
        name: "Home",
        uri: "/",
      },
      {
        name: "Blog",
        uri: "https://blog.sadiksaifi.dev",
      },
      {
        name: "About",
        uri: "#about",
      },
      {
        name: "Contact",
        uri: "#contact",
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
