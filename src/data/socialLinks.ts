export const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/tiktalinktechal",
    handle: "@tiktalinktechal",
  },
  {
    name: "X",
    url: "https://x.com/tiktalinktechal",
    handle: "@tiktalinktechal",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@tiktalinktechal",
    handle: "@tiktalinktechal",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@tiktalinktechal",
    handle: "@tiktalinktechal",
  },
  {
    name: "Pinterest",
    url: "https://www.pinterest.com/tiktalinktechal",
    handle: "@tiktalinktechal",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/tiktalinktechal",
    handle: "Tiktalink TechAl",
  },
  {
    name: "Medium",
    url: "https://medium.com/@tiktalinktechal",
    handle: "@tiktalinktechal",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com/user/tiktalinktechal",
    handle: "u/tiktalinktechal",
  },
  {
    name: "Tumblr",
    url: "https://www.tumblr.com/tiktalinktechal",
    handle: "tiktalinktechal",
  },
  {
    name: "GitHub",
    url: "https://github.com/tiktalinktechal",
    handle: "@tiktalinktechal",
  },
] as const;

export const primarySocialLinks = socialLinks.filter((link) =>
  ["LinkedIn", "Instagram", "X", "YouTube"].includes(link.name)
);

