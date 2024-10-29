export default [
    {
        logo: "/assets/images/common/logo.svg",
    },
    {
        title: "Developer Portal",
        isInverted: true,
        items: [
            {
                link: "/",
                text: "Home",
            },
            {
                link: "/docs",
                text: "Docs",
            },
        ],
    },
    {
        title: "Products",
        items: [
            {
                text: "Staking portal",
                link: "https://staking.singularitynet.io/howitworks",
            },
            {
                text: "AI Marketplace",
                link: "https://beta.singularitynet.io/",
            },
            {
                text: "AI Publisher",
                link: "https://publisher.singularitynet.io/",
            },
            {
                text: "Linking Wallet Tool",
                link: "https://mywallets.singularitynet.io/",
            },
            {
                text: "Bridge Ethereum-Cardano",
                link: "https://bridge.singularitynet.io/",
            },
            {
                text: "Bridge Ethereum-Binance",
                link: "https://bsc-bridge.singularitynet.io/",
            },
            {
                text: "Bridge Cardano AGIX-ASI",
                link: "https://asi-migration.singularitynet.io/",
            },
        ],
    },
    {
        title: "Community",
        items: [
            {
                text: "Blog",
                link: "http://blog.singularitynet.io/",
            },
            {
                text: "Mattermost",
                link: "https://chat.singularitynet.io/chat/channels/town-square",
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
    {
        title: "Ecosystem",
        items: [
            {
                link: "https://singularitynet.io/ecosystem/singularitydao/",
                text: "SingularityDAO",
            },
            {
                link: "https://singularitynet.io/ecosystem/rejuve/",
                text: "Rejuve",
            },
            {
                link: "https://singularitynet.io/ecosystem/nunet/",
                text: "Nunet",
            },
        ]
    },
    {
        title: "Social Media",
        items:[
            {
                link: "https://twitter.com/singularity_net",
                text: "Twitter",
            },
            {
                link: "https://www.facebook.com/singularityNET.io",
                text: "Facebook",
            },
            {
                link: "https://www.linkedin.com/company/singularitynet/",
                text: "LinkedIn",
            },
            {
                link: "https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw",
                text: "YouTube",
            },
            {
                link: "https://instagram.com/singularitynet.io",
                text: "Instagram",
            },
        ]
    }
];

export const copyrightSection = {
    text: `© ${new Date().getFullYear()} SingularityNET`,
    message: "",
};
