import { defineConfig } from "vitepress";
import generalConfig from "../config/content/generalConfig";
import navContent from "../config/content/navContentConfig";
import sidebarContent from "../config/content/sidebarContentConfig";
import markdownConfig from '../config/markdown/markdownConfig';
import assetsLinks from "../config/mediaLinks/assetsLinks";

export default defineConfig({
  appearance: {
    // @ts-expect-error not fully supported yet
    initialValue: 'light'
  },
  cleanUrls: true,
  lastUpdated: true,
  head: assetsLinks,
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
