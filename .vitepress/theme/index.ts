import SpriteIcon from "../../components/Common/SpriteIcon.vue";
import Home from "../../components/Home/Home.vue";
import Video from "../../components/Common/Video.vue";
import NavigationControl from "../../components/NavigationControl/NavigationControl.vue";
import FeedBackForm from "../../components/Common/FeedBackForm.vue";
import Footer from "../../components/Footer/Footer.vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./style.css";

export default {
    extends: DefaultTheme,
    Layout() {
        return h(
            DefaultTheme.Layout,
            null,
            {
                "layout-bottom": () => h(Footer),
                "sidebar-nav-before": () => h(NavigationControl),
                "layout-top": () => h(FeedBackForm),
            }
        );
    },
    enhanceApp({ app, router }) {
        app.component("Home", Home);
        app.component("Video", Video);
        app.component("SpriteIcon", SpriteIcon);
    },
} satisfies Theme;
