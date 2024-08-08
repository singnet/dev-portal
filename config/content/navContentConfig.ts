export default [
  { text: "Home", link: "/", activeMatch: '' },
  { text: "Docs", link: "/docs", activeMatch: '/docs/' },
  {
    text: "Products",
    items: [
    {
        text: "Staking portal",
        link: "https://staking.singularitynet.io/howitworks",
    },
    { 
        text: "AI Marketplace", 
        link: "https://beta.singularitynet.io/" 
    },
    {
        text: "AI Publisher", 
        link: "https://publisher.singularitynet.io/" 
    },
    ],
  },
  {
    text: "Community",
    items: [
    {
        text: "Blog",
        link: "http://blog.singularitynet.io/",
    },
    { 
        text: "Forum", 
        link: "https://community.singularitynet.io/" 
    },
    {
        text: "Telegram", 
        link: "https://telegram.me/singularitynet" 
    },
    ],
  },
];
