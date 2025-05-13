import type { DefaultTheme } from "vitepress";

export default [
    { text: "Old Dev Portal", link: "https://old-dev.singularitynet.io/" },
    { text: "Home", link: "/", activeMatch: "^/$|^$" },
    { text: "Docs", link: "/docs/", activeMatch: "^/docs/" },
    {
        text: "Products",
        items: [
            {
                text: "Staking portal",
                link: "https://staking.singularitynet.io/howitworks",
            },
            {
                text: "AI Marketplace",
                link: "https://marketplace.singularitynet.io/",
            },
            {
                text: "Publisher Portal",
                link: "https://publisher.singularitynet.io/",
            },
            {
                text: "AI UI Constructor (Sandbox)",
                link: "https://ai-ui-constructor.singularitynet.io",
            },
            {
                text: "Linking Wallet Tool",
                link: "https://mywallets.singularitynet.io/",
            },
            {
                text: "Bridge",
                items: [
                    {
                        text: "Ethereum-Cardano",
                        link: "https://bridge.singularitynet.io/",
                    },
                    {
                        text: "Ethereum-Binance",
                        link: "https://bsc-bridge.singularitynet.io/",
                    },
                    {
                        text: "Cardano AGIX-ASI",
                        link: "https://asi-migration.singularitynet.io/",
                    },
                ]
            },
        ],
    },
    {
        text: "Community",
        items: [
            {
                text: "Website",
                link: "https://singularitynet.io/"
            },
            {
                text: "Blog",
                link: "http://blog.singularitynet.io/",
            },
            {
                text: "Forum",
                link: "https://community.singularitynet.io/",
            },
            {
                text: "Telegram",
                link: "https://telegram.me/singularitynet",
            },
        ],
    },
] as DefaultTheme.NavItem[];
