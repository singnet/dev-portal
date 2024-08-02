export default [
    {
        text: "AI Platform Ecosystem",
        textIconID: "marketplace-icon",
        imageSrc: "/assets/images/common/platform.png",
        description:
            "Explore, publish, and integrate AI services on AI Marketplace's docs.",
        items: [
            {
                text: "Getting started",
                textIconID: "lightning-icon",
                link: "/docs/products/AIMarketplace",
                primary: true,
            },
            {
                text: "Core concepts",
                link: "/docs/products/AIMarketplace/coreconcepts/keyterms",
                items: [
                    {
                        text: "Marketplace-ecosystem",
                        link: "/docs/products/AIMarketplace/coreconcepts/Marketplace-ecosystem/marketplace",
                    },
                    {
                        text: "Smart contracts",
                        link: "/docs/products/AIMarketplace/coreconcepts/Smart-contracts/smart-contracts",
                    },
                    {
                        text: "ERC20",
                        link: "/docs/products/AIMarketplace/coreconcepts/erc20",
                      },
                      {
                        text: "ETCD",
                        link: "/docs/products/AIMarketplace/coreconcepts/etcd",
                      },
                      {
                        text: "Ethereum Address",
                        link: "/docs/products/AIMarketplace/coreconcepts/ethereum-address",
                      },
                      {
                        text: "GRPC",
                        link: "/docs/products/AIMarketplace/coreconcepts/grpc",
                      },
                      {
                        text: "IPFS",
                        link: "/docs/products/AIMarketplace/coreconcepts/ipfs",
                      },
                      {
                        text: "Protobuf",
                        link: "/docs/products/AIMarketplace/coreconcepts/protobuf",
                      },
                      {
                        text: "ETCD Setup",
                        link: "/docs/products/AIMarketplace/coreconcepts/etcdsetup",
                      },
                ],
            },
            {
                text: "Daemon",
                collapsed: true,
                link: "/docs/products/AIMarketplace/daemon/daemon-api",
                items: [
                  {
                    text: "Daemon architecture",
                    link: "/docs/products/AIMarketplace/daemon/daemon-architecture",
                  },
                  {
                    text: "Daemon Channel Storage",
                    link: "/docs/products/AIMarketplace/daemon/daemon-channel-storage",
                  },
                  {
                    text: "Daemon SSL Setup",
                    link: "/docs/products/AIMarketplace/daemon/daemon-ssl-setup",
                  },
                  {
                    text: "Daemon Setup",
                    link: "/docs/products/AIMarketplace/daemon/daemon-setup",
                  },
                ],
              },
              {
                text: "Tools",
                collapsed: true,
                items: [
                  {
                    text:"CLI",
                    collapsed: true,
                    link: "/docs/products/AIMarketplace/tools/CLI/snet-cli",
                },
                {
                    text: "SDK",
                    collapsed: true,
                    link: "/docs/products/AIMarketplace/tools/SDK/concepts-sdk",
                }
                ]
            },
            {
                text: "For comers",
                link: "/docs/products/AIMarketplace/forcomers",
                items:[
                    {
                        text: "Call a service",
                        link: "/docs/products/AIMarketplace/forcomers/call-a-service",
                      },
                      {
                        text: "Integration",
                        link: "/docs/products/AIMarketplace/forcomers/integration",
                      },
                      {
                        text: "Local Singularity",
                        link: "/docs/products/AIMarketplace/forcomers/local-singularitynet",
                      },
                      {
                        text: "MetaMask",
                        link: "/docs/products/AIMarketplace/forcomers/metamask",
                      },
                      {
                        text: "OpenCog",
                        link: "/docs/products/AIMarketplace/forcomers/opencog",
                      },
                      {
                        text: "Organization",
                        link: "/docs/products/AIMarketplace/forcomers/organization",
                      },
                      {
                        text: "Publish",
                        link: "/docs/products/AIMarketplace/forcomers/publish",
                      },
                      {
                        text: "RasberryPI",
                        link: "/docs/products/AIMarketplace/forcomers/raspberrypi",
                      },
                      {
                        text: "Registry",
                        link: "/docs/products/AIMarketplace/forcomers/registry",
                      },
                      {
                        text: "Requirements",
                        link: "/docs/products/AIMarketplace/forcomers/requirements",
                      },
                      {
                        text: "Setup Guide",
                        link: "/docs/products/AIMarketplace/forcomers/setupguide",
                      },
                      {
                        text: "Wallet",
                        link: "/docs/products/AIMarketplace/forcomers/wallet",
                      },
                      {
                        text: "Claim",
                        link: "/docs/products/AIMarketplace/forcomers/claim",
                      },
                      {
                        text: "PayPal",
                        link: "/docs/products/AIMarketplace/forcomers/paypal",
                      },
                      {
                        text: "Guide for testnet",
                        link: "/docs/products/AIMarketplace/forcomers/snet-full-guide-testnet",
                      },
                      {
                        text: "Guide for mainnet",
                        link: "/docs/products/AIMarketplace/forcomers/snet-full-guide-mainnet",
                      },
                      {
                        text: "FAQ",
                        link: "/docs/products/AIMarketplace/forcomers/faq",
                      },
                      {
                        text: "Troubleshooting",
                        link: "/docs/products/AIMarketplace/forcomers/troubleshooting",
                      },
                ]
            },
            {
                text:"Publisher",
                link:"/docs/products/AIMarketplace/publisher/publisher-portal",
            }
        ],
    },
    {
        text: "Staking",
        textIconID: "staking-icon",
        imageSrc: "/assets/images/common/staking.png",
        description:
            "funny pig",
        items:[
            {
                text:"Stake window",
                link:"/docs/products/Staking/stake-window"
              },
              {
                text:"Stake timeline",
                link:"/docs/products/Staking/stake-timeline"
              },
              {
                text:"Stake reward",
                link:"/docs/products/Staking/stake-reward"
              },
              {
                text:"Stake opt out",
                link:"/docs/products/Staking/stake-opt-out"
              },
              {
                text:"Cardano Staking withdraw",
                link:"/docs/products/Staking/cardano-staking-withdraw"
              },
              {
                text:"Cardano Staking Timeline",
                link:"/docs/products/Staking/cardano-staking-timeline"
              },
              {
                text:"Cardano Staking Rewards",
                link:"/docs/products/Staking/cardano-staking-rewards"
              }
        ]
    },
    {
        text: "about technologies",
        textIconID: "marketplace-icon",
        imageSrc: "/assets/images/common/techs.png",
        description:
            "Some technologies that we use",
        items:[
            {
                text: "Blockchain",
                link: "/docs/products/About-technologies/blockchain",
              },
              {
                text: "Ethereum",
                link: "/docs/products/About-technologies/ethereum",
              },
              {
                text: "Concepts of organization",
                link: "/docs/products/About-technologies/concepts-organization",
              },
              {
                text: "Introduction in SDK",
                link: "/docs/products/About-technologies/sdk",
              },
        ]
    }
];
