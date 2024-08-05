import Home from "../../components/Home.vue";
import Video from "../../components/Video.vue";
import SpriteIcon from "../../components/SpriteIcon.vue";
import Footer from "../../components/Footer.vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(Footer),
      
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Home", Home);
    app.component("Video", Video);
    app.component("SpriteIcon", SpriteIcon);
  },
} satisfies Theme;
