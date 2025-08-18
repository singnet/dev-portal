import DefaultTheme from "vitepress/theme";
import Home from "../../components/Home/Home.vue";
import Video from "../../components/Common/Video.vue";
import Footer from "../../components/Footer/Footer.vue";
import SpriteIcon from "../../components/Common/SpriteIcon.vue";
import ImageViewer from "../../components/Common/ImageViewer.vue";
import FeedBackForm from "../../components/Common/FeedBackForm.vue";
import AccordionItem from "../../components/Common/AccordionItem.vue";
import NavigationControl from "../../components/NavigationControl/NavigationControl.vue";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./style.css";

const DAEMON_VERSION = 'v6.1.0';

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
        app.component("ImageViewer", ImageViewer);
        app.component("AccordionItem", AccordionItem);
        app.config.globalProperties.$daemonVersion = DAEMON_VERSION;
    },
} satisfies Theme;
