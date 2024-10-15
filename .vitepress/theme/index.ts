import SpriteIcon from "../../components/Common/SpriteIcon.vue";
import Home from "../../components/Home/Home.vue";
import Video from "../../components/Common/Video.vue";
import SectionNavigationGrid from "../../components/Common/SectionNavigationGrid.vue";
import NavigationControl from "../../components/NavigationControl/NavigationControl.vue";
import FeedBackForm from "../../components/Common/FeedBackForm.vue";
import Footer from "../../components/Footer/Footer.vue";
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";
import "./style.css";

import { ref, watch } from "vue";
import { useRouter } from "vitepress";

export default {
    extends: DefaultTheme,
    Layout() {
        const router = useRouter();
        const layoutKey = ref<string>("default");

        if(router.route.path.includes("/docs/")) {
          layoutKey.value = router.route.path;
        }

        watch(
            () => router.route.path,
            (newPath, oldPath) => {
              console.log("PATH changed from", oldPath, "to", newPath);
              
                if (newPath !== oldPath) {
                    layoutKey.value = newPath;
                }
            }
        );

        console.log("LC ", layoutKey.value);

        return h(
            DefaultTheme.Layout,
            {
                key: layoutKey.value,
            },
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
        app.component("SectionNavigationGrid", SectionNavigationGrid);
    },
} satisfies Theme;
