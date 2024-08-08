export default [
  {
    text: "About technologies",
    collapsed: true,
    items: [
      {
        text: "Blockchain",
        link: "/docs/products/About-technologies/blockchain",
      },
      {
        text: "Ethereum",
        link: "/docs/products/About-technologies/ethereum",
      },
      {
        text: "AGI Token",
        link: "/docs/products/About-technologies/agi-token",
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
  },
  {
    text: "AI Marketplace",
    collapsed: false,
    items: [
      {
        text: "Core concepts",
        collapsed: true,
        link:"/docs/products/AIMarketplace/coreconcepts/keyterms",
        items: [
          {
            text:"Marketplace ecosystem",
            collapsed: true,
            link: "/docs/products/AIMarketplace/coreconcepts/Marketplace-ecosystem/marketplace",
            items:[
              {
                text: "Service",
                link: "/docs/products/AIMarketplace/coreconcepts/Marketplace-ecosystem/service",
              },
              {
                text: "Explanation of Daemon",
                link: "/docs/products/AIMarketplace/coreconcepts/Marketplace-ecosystem/daemon",
              },
              {
                text: "Marketplace service invocation",
                link: "/docs/products/AIMarketplace/coreconcepts/Marketplace-ecosystem/marketplace-service_invocation",
              },
              {
                text: "Marketplace service training",
                link: "/docs/products/AIMarketplace/coreconcepts/Marketplace-ecosystem/marketplace-service_training",
              },
            ]
          },
          {
            text:"Smart contracts",
            collapsed: true,
            link: "/docs/products/AIMarketplace/coreconcepts/Smart-contracts/smart-contracts",
            items:[
              {
                text: "MPE",
                link: "/docs/products/AIMarketplace/coreconcepts/Smart-contracts/mpe",
              },
              {
                text: "MPE Stateless Client",
                link: "/docs/products/AIMarketplace/coreconcepts/Smart-contracts/mpe-stateless-client"
              }
            ]
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
        text: "For comers",
        collapsed: true,
        link: "/docs/products/AIMarketplace/forcomers",
        items: [
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
            items: [
              {
                text: "Organization setup via CLI",
                link: "/docs/products/AIMarketplace/tools/CLI/organization-setup-sent-cli",
              },
              {
                text: "Service setup via CLI",
                link: "/docs/products/AIMarketplace/tools/CLI/service-setup-snet-cli",
              },
            ]
          },
          {
            text: "SDK",
            collapsed: true,
            link: "/docs/products/AIMarketplace/tools/SDK/concepts-sdk",
            items:[
            {
              text: "Architecture of SDK",
              link: "/docs/products/AIMarketplace/tools/SDK/sdk-architecture",
            },
            {
              text: "SDK Tutorial",
              link: "/docs/products/AIMarketplace/tools/SDK/sdk-tutorial",
            },
            ]
          }
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
    collapsed: true,
    link:"/docs/products/Staking/staking",
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
  }
];
