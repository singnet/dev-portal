import { defineConfig } from "vitepress";
import generalConfig from "../config/content/generalConfig";
import navContent from "../config/content/navContentConfig";
import sidebarContent from "../config/content/sidebarContentConfig";
import markdownConfig from '../config/markdown/markdownConfig';

export default defineConfig({
  title: generalConfig.siteName,
  description: generalConfig.siteDescription,
  themeConfig: {
    logo: "/assets/images/common/logo.svg",
    nav: navContent,
    search: {
      provider: "local",
    },
    sidebar: sidebarContent,
  },
  markdown: markdownConfig,
});
