import SpriteIcon from "/components/Common/SpriteIcon.vue";
import Home from "/components/Home/Home.vue";
import Video from "/components/Common/Video.vue";
import SectionNavigationGrid from "/components/Common/SectionNavigationGrid.vue";
import SidebarToggle from "/components/Common/SidebarToggle.vue";
import Footer from "/components/Footer/Footer.vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(Footer),
      "sidebar-nav-before": () => h(SidebarToggle),
      // "doc-before": () => h(SidebarToggle),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Home", Home);
    app.component("Video", Video);
    app.component("SpriteIcon", SpriteIcon);
    app.component("SectionNavigationGrid", SectionNavigationGrid);
  },
} satisfies Theme;
