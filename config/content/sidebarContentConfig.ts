import type { DefaultTheme } from "vitepress";
export interface ISectionData {
    name: string;
    path: string;
    documentPath?: string;
    textIconID?: string;
}

export interface ISiteSections {
    [sectionID: string]: ISectionData;
}

export const RootSections: ISiteSections = {
    DOCS: {
        name: "/Docs",
        path: "/docs/",
        documentPath: "/docs/index.md",
        textIconID: "techs-icon",
    },
};

export const Products: ISiteSections = {
    TECHNOLOGIES: {
        name: "About Technologies",
        path: "/docs/products/AboutTechnologies/",
        textIconID: "techs-icon",
    },
    MARKETPLACE: {
        name: "AI Marketplace",
        path: "/docs/products/AIMarketplace/",
        textIconID: "marketplace-icon",
    },
    STAKING: {
        name: "Staking",
        path: "/docs/products/Staking/",
        textIconID: "staking-icon",
    },
    WALT: {
        name: "WaLT",
        path: "/docs/products/WaLT/",
        textIconID: "walt-icon",
    },
    BRIDGE: {
        name: "Bridge",
        path: "/docs/products/Bridge/",
        textIconID: "bridge-icon",
    },
    AIRDROP: {
        name: "Airdrop",
        path: "/docs/products/Airdrop/",
        textIconID: "airdrop-icon",
    },
    PLATFORM:{
        name: "Decentralized AI Platform",
        path: "/docs/products/DecentralizedAIPlatform/",
        textIconID: "marketplace-icon",
    },
};

export const TechnologiesSection: DefaultTheme.SidebarItem[] = [
    {
        text: "Blockchain",
        link: "/docs/products/AboutTechnologies/blockchain",
    },
    {
        text: "Ethereum",
        link: "/docs/products/AboutTechnologies/ethereum",
    },
    {
        text: "AGIX Token",
        link: "/docs/products/AboutTechnologies/agi-token",
    },
    {
        text: "Concepts of organization",
        link: "/docs/products/AboutTechnologies/concepts-organization",
    },
    {
        text: "Introduction in SDK",
        link: "/docs/products/AboutTechnologies/sdk",
    },
];

export const PlatformSection = [
    {
        text: "I am AI Consumer",
        link: "/docs/products/DecentralizedAIPlatform/IAmAIConsumer"
    },
    {
        text: "I am AI Developer",
        link: "/docs/products/DecentralizedAIPlatform/IAmAIDeveloper"
    },
    {
        text: "Quick Start Guides",
        link: "",
        collapsed: true,
        items: [
            {
                text: "Getting Ready to Onboard CheckUp",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToOnboardCheckUp",
            },
            {
                text: "Service Onboarding via Publisher",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceOnboardingViaPublisher",
            },
            {
                text: "Service Onboarding via CLI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceOnboardingViaCLI",
            },
            {
                text: "Service Onboarding via TUI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceOnboardingViaTUI",
            },
            {
                text: "Service Calling via CLI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaCLI",
            },
            {
                text: "Service Calling via TUI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaTUI",
            },
            {
                text: "Service Calling via SDK",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaSDK",
            },
        ],
    },
    {
        text: "Core concepts",
        collapsed: true,
        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/keyterms",
        items: [
            {
                text: "Marketplace ecosystem",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace",
                items: [
                    {
                        text: "Service",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/service",
                    },
                    {
                        text: "Explanation of Daemon",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/daemon",
                    },
                    {
                        text: "Marketplace service invocation",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace-service_invocation",
                    },
                    {
                        text: "Marketplace service training",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace-service_training",
                    },
                ],
            },
            {
                text: "Smart contracts",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/smart-contracts",
                items: [
                    {
                        text: "MPE",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe",
                    },
                    {
                        text: "MPE Stateless Client",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe-stateless-client",
                    },
                ],
            },

            {
                text: "ERC20",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/erc20",
            },
            {
                text: "ETCD",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/etcd",
            },
            {
                text: "Ethereum Address",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/ethereum-address",
            },
            {
                text: "GRPC",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/grpc",
            },
            {
                text: "IPFS",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/ipfs",
            },
            {
                text: "Protobuf",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/protobuf",
            },
            {
                text: "ETCD Setup",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/etcdsetup",
            },
        ],
    },
    {
        text: "Daemon",
        link: "",
        collapsed: true,
        items: [
            {
                text: "Daemon architecture",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-architecture",
            },
            {
                text: "Daemon Channel Storage",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-channel-storage",
            },
            {
                text: "Daemon SSL Setup",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-ssl-setup",
            },
            {
                text: "Daemon Setup",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-setup",
            },
        ],
    },
    {
        text: "CLI",
        link: "/docs/products/DecentralizedAIPlatform/CLI/snet-cli",
        collapsed: true,
        items: [
            {
                text: "Organization setup via CLI",
                link: "/docs/products/DecentralizedAIPlatform/CLI/organization-setup-sent-cli",
            },
            {
                text: "Service setup via CLI",
                link: "/docs/products/DecentralizedAIPlatform/CLI/service-setup-snet-cli",
            },
        ],
    },
    {
        text: "TUI",
        link: "/docs/products/DecentralizedAIPlatform/TUI/",
        collapsed: true,
        items: [
            {
                text: "Getting Started",
                link: "/docs/products/DecentralizedAIPlatform/TUI/getting-started/",
                collapsed: true,
                items: [
                    {
                        text: "Installation",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/getting-started/installation",
                    },
                    {
                        text: "First time start up",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/getting-started/first-time-start-up",
                    },
                    {
                        text: "Execution",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/getting-started/execution",
                    },
                ],
            },
            {
                text: "Menus",
                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/",
                collapsed: true,
                items: [
                    {
                        text: "Account",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/",
                        collapsed: true,
                        items: [
                            {
                                text: "Identify page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/identity-page/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Create identity page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/identity-page/create-identity-page",
                                        collapsed: true,
                                    },
                                ],
                            },
                            {
                                text: "Treasurer",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/treasurer/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Claim",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/treasurer/claim",
                                        collapsed: true,
                                    },
                                    {
                                        text: "Claim all",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/treasurer/claim-all",
                                        collapsed: true,
                                    },
                                    {
                                        text: "Claim expired",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/treasurer/claim-expired",
                                        collapsed: true,
                                    },
                                ],
                            },
                            {
                                text: "Deposit",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/deposit",
                            },
                            {
                                text: "Transfer",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/transfer",
                            },
                            {
                                text: "Withdraw",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/account/withdraw",
                            },
                        ],
                    },
                    {
                        text: "Client",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/",
                        collapsed: true,
                        items: [
                            {
                                text: "Channels menu",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Claim page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/claim-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Claim timeout",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/claim-page/claim-timeout",
                                            },
                                            {
                                                text: "Claim all timeout",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/claim-page/claim-all-timeout",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Extend page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/extend-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Extend add",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/extend-page/extend-add",
                                            },
                                            {
                                                text: "Extend add organization",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/extend-page/extend-add-organization",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Initialize open page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/initialize-open-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Initialize",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/initialize-open-page/initialize",
                                            },
                                            {
                                                text: "Initialize metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/initialize-open-page/initialize-metadata",
                                            },
                                            {
                                                text: "Open initialize",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/initialize-open-page/open-initialize",
                                            },
                                            {
                                                text: "Open initialize metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/initialize-open-page/open-initialize-metadata",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Print page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Print all channels filter group",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/print-all-channels-filter-group",
                                            },
                                            {
                                                text: "Print all channels filter sender",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/print-all-channels-filter-sender",
                                            },
                                            {
                                                text: "Print all channels filter group sender",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/print-all-channels-filter-group-sender",
                                            },
                                            {
                                                text: "Print all channels filter group recipient",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/print-all-channels-filter-recipient",
                                            },
                                            {
                                                text: "Print initialized channels",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/print-initialized-channels",
                                            },
                                            {
                                                text: "Print initialized channels filter organization",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/channels-menu/print-page/print-initialized-channels-filter-organization",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                text: "Call",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/call",
                            },
                            {
                                text: "Call low level",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/call-low-level",
                            },
                            {
                                text: "Get channel state",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/client/get-channel-state",
                            },
                        ],
                    },
                    {
                        text: "Organization",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/",
                        collapsed: true,
                        items: [
                            {
                                text: "Groups page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/groups-page/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Add a group",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/groups-page/add-a-group",
                                    },
                                    {
                                        text: "Update group",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/groups-page/update-group",
                                    },
                                ],
                            },
                            {
                                text: "Manage page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/manage-page/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Create organization",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/manage-page/create-organization",
                                    },
                                    {
                                        text: "Delete organization",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/manage-page/delete-organization",
                                    },
                                ],
                            },
                            {
                                text: "Members page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/members-page/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Manage members",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/members-page/manage-members",
                                    },
                                    {
                                        text: "Change organization owner",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/members-page/change-organization-owner",
                                    },
                                ],
                            },
                            {
                                text: "Metadata page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Add description",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/add-description",
                                    },
                                    {
                                        text: "Initialize metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/initialize-metadata",
                                    },
                                    {
                                        text: "Manage assets",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/manage-assets",
                                    },
                                    {
                                        text: "Manage contacts",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/manage-contacts",
                                    },
                                    {
                                        text: "Print metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/print-metadata",
                                    },
                                    {
                                        text: "Update metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/organization/metadata-page/update-metadata",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        text: "Services",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/",
                        collapsed: true,
                        items: [
                            {
                                text: "Manage page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/manage-page/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Publish Service",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/manage-page/publish-service",
                                    },
                                    {
                                        text: "Delete service",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/manage-page/delete-service",
                                    },
                                ],
                            },
                            {
                                text: "Metadata menu",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Add/remove page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/add-remove-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Add/remove description",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/add-remove-page/add-service-description",
                                            },
                                            {
                                                text: "Add/remove daemon address",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/add-remove-page/add-remove-daemon-address",
                                            },
                                            {
                                                text: "Add/remove service metadata assets",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/add-remove-page/add-remove-service-metadata-assets",
                                            },
                                            {
                                                text: "Add/remove service metadata groups",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/add-remove-page/add-remove-service-metadata-groups",
                                            },
                                            {
                                                text: "Add/remove service metadata media",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/add-remove-page/add-remove-service-metadata-media",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Get page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/get-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Service status",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/get-page/service-status",
                                            },
                                            {
                                                text: "API metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/get-page/api-metadata",
                                            },
                                            {
                                                text: "API registry",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/get-page/api-registry",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Set page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/set-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Set fixed price",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/set-page/set-fixed-price",
                                            },
                                            {
                                                text: "Set free calls",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/set-page/set-free-calls",
                                            },
                                            {
                                                text: "Set free call signer address",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/set-page/set-free-call-signer-address",
                                            },
                                            {
                                                text: "Set method price",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/set-page/set-method-price",
                                            },
                                            {
                                                text: "Set model",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/set-page/set-model",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Update page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/update-page/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Update service daemon address",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/update-page/update-service-daemon-address",
                                            },
                                            {
                                                text: "Update metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/update-page/update-metadata",
                                            },
                                            {
                                                text: "Validate metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/update-page/validate-metadata",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Initialize service metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/metadata-menu/initialize-service-metadata",
                                    },
                                ],
                            },
                            {
                                text: "View all page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/menus/services/view-all-page",
                            },
                        ],
                    },
                    {
                        text: "Custom command",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/menus/custom-command",
                    },
                ],
            },
            {
                text: "Tutorials",
                link: "/docs/products/DecentralizedAIPlatform/TUI/tutorials/",
                collapsed: true,
                items: [
                    {
                        text: "Adding funds to wallet",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/tutorials/adding-funds-to-wallet",
                    },
                    {
                        text: "Invoke a service with the TUI",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/tutorials/invoke-a-service-with-the-tui",
                    },
                    {
                        text: "Opening and Initializing a payment channel",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/tutorials/opening-and-initializing-a-payment-channel",
                    },
                ],
            },
            {
                text: "FAQ",
                link: "/docs/products/DecentralizedAIPlatform/TUI/faq/",
                collapsed: true,
                items: [
                    {
                        text: "Could not retrieve account information",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/faq/could-not-retrieve-account-information",
                    },
                    {
                        text: "How do I select text, and copy/paste?",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/faq/how-do-i-select-text-and-copy-paste",
                    },
                    {
                        text: "I want to use my keyboard instead of my mouse!",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/faq/i-want-to-use-my-keyboard-instead-of-my-mouse",
                    },
                    {
                        text: "JSON Serialization on Windows",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/faq/json-serialization-on-windows",
                    },
                    {
                        text: "The TUI looks really bad on my screen! What do I do?",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/faq/the-tui-looks-really-bad-on-my-screen-what-do-i-do",
                    },
                ],
            },
        ],
    },
    {
        text: "Publisher Portal",
        link: "/docs/products/DecentralizedAIPlatform/PublisherPortal/",
        collapsed: true,
        items: [
            {
                text: "Text Quickstart Guide",
                link: "/docs/products/DecentralizedAIPlatform/PublisherPortal/text-guide",
            },
            {
                text: "Video Quickstart Guide",
                link: "/docs/products/DecentralizedAIPlatform/PublisherPortal/video-guide",
            },
        ],
    },
    {
        text: "SDK",
        link: "/docs/products/DecentralizedAIPlatform/SDK/",
        collapsed: true,
        items: [
            {
                text: "Architecture of SDK",
                link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-architecture",
            },
            {
                text: "SDK Tutorial",
                link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-tutorial",
            },
            {
                text: "Python SDK",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/SDK/python-sdk-first-steps",
                items: [
                    {
                        text: "Getting started guide",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide",
                    },
                    {
                        text: "Calculator example",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/calculator",
                    },
                    {
                        text: "Console App example",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/console-app",
                    },
                    {
                        text: "Documentation",
                        collapsed: true,
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation",
                        items: [
                            {
                                text: "init",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/init",
                            },
                            {
                                text: "account",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/account",
                            },
                            {
                                text: "service_client",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/service-client",
                            },
                            {
                                text: "config",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/config",
                            },
                            {
                                text: "client_lib_generator",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/client-lib-generator",
                            },
                            {
                                text: "concurrency_manager",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/concurrency-manager",
                            },
                            {
                                text: "service_metadata",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/service-metadata",
                            },
                            {
                                text: "metadata_provider",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/metadata-provider",
                            },
                            {
                                text: "ipfs_metadata_provider",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/ipfs-metadata-provider",
                            },
                            {
                                text: "mpe_contract",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/mpe-contract",
                            },
                            {
                                text: "payment_channel",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/payment-channel",
                            },
                            {
                                text: "payment_channel_provider",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/payment-channel-provider",
                            },
                            {
                                text: "payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/payment-strategy",
                            },
                            {
                                text: "default_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/default-payment-strategy",
                            },
                            {
                                text: "freecall_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/freecall-payment-strategy",
                            },
                            {
                                text: "paidcall_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/paidcall-payment-strategy",
                            },
                            {
                                text: "prepaid_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/prepaid-payment-strategy",
                            },
                            {
                                text: "training",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/training",
                            },
                            {
                                text: "utils",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/utils",
                            },
                            {
                                text: "ipfs_utils",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/documentation/ipfs-utils",
                            },
                        ],
                    },
                ],
            },
            {
                text: "NodeJS SDK",
                link:"",
                collapsed: true,
                items:[],
            },
            {
                text: "WebJS SDK",
                link:"",
                collapsed: true,
                items:[],
            },
            {
                text: "Java SDK",
                link:"",
                collapsed: true,
                items:[],
            },
        ],
    },
    {
        text: "UI Sandbox",
        link: "",
        collapsed: true,
        items: [],
    },
    {
        text: "UI Boilerplate",
        link: "",
        collapsed: true,
        items: [],
    },
    {
        text: "Used Technologies",
        link: "",
        collapsed: true,
        items: [],
    },
];

export const MarketplaceSection = [
    {
        text: "For comers",
        collapsed: true,
        link: "/docs/products/AIMarketplace/forcomers/",
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
];

export const StakingSection = [
    {
        text: "Ethereum Staking",
        collapsed: true,
        items: [
            {
                text: "Stake window",
                link: "/docs/products/Staking/stake-window",
            },
            {
                text: "Stake timeline",
                link: "/docs/products/Staking/stake-timeline",
            },
            {
                text: "Stake reward",
                link: "/docs/products/Staking/stake-reward",
            },
            {
                text: "Stake opt out",
                link: "/docs/products/Staking/stake-opt-out",
            },
        ],
    },
    {
        text: "Cardano Staking",
        collapsed: true,
        items: [
            {
                text: "Cardano Staking withdraw",
                link: "/docs/products/Staking/cardano-staking-withdraw",
            },
            {
                text: "Cardano Staking Timeline",
                link: "/docs/products/Staking/cardano-staking-timeline",
            },
            {
                text: "Cardano Staking Rewards",
                link: "/docs/products/Staking/cardano-staking-rewards",
            },
            {
                text: "Cardano Staking withdraw NTX",
                link: "/docs/products/Staking/cardano-staking-withdraw-ntx",
            },
            {
                text: "Cardano Staking Timeline NTX",
                link: "/docs/products/Staking/cardano-staking-timeline-ntx",
            },
            {
                text: "Cardano Staking Rewards NTX",
                link: "/docs/products/Staking/cardano-staking-rewards-ntx",
            },
        ],
    },
];

export const WALTSection: DefaultTheme.SidebarItem[] = [
    {
        text: "How to Use",
        link: "/docs/products/WaLT/howtouse",
    },
    {
        text: "Frequently Asked Questions",
        link: "/docs/products/WaLT/faq",
    },
];

export const BridgeSection: DefaultTheme.SidebarItem[] = [
    {
        text: "Selecting Networks",
        link: "/docs/products/Bridge/selecting-networks",
    },
    {
        text: "Troubles",
        link: "/docs/products/Bridge/troubles",
    },
    {
        text: "FAQ",
        link: "/docs/products/Bridge/faq",
    },
    {
        text: "Ethereum-Binance",
        link: "/docs/products/Bridge/eth-to-binance",
    },
    {
        text: "Testing",
        collapsed: true,
        items: [
            {
                text: "Prerequisites",
                link: "/docs/products/Bridge/testing/prerequisites",
            },
            {
                text: "Connecting wallets",
                link: "/docs/products/Bridge/testing/connecting-wallets",
            },
            {
                text: "Ethereum to Cardano Conversion",
                link: "/docs/products/Bridge/testing/eth-to-cardano-conversion",
            },
            {
                text: "Cardano to Ethereum Conversion",
                link: "/docs/products/Bridge/testing/cardano-to-eth-conversion",
            },
        ],
    },
];

export const AirdropSection: DefaultTheme.SidebarItem[] = [
    {
        text: "Registration",
        link: "/docs/products/Airdrop/Registration/",
        collapsed: true,
        items: [
            {
                text: "Connect wallet",
                link: "/docs/products/Airdrop/Registration/connect-wallet",
            },
            {
                text: "Register",
                link: "/docs/products/Airdrop/Registration/register",
            },
        ],
    },
    {
        text: "Claim",
        link: "/docs/products/Airdrop/claim",
    },
    {
        text: "FAQ",
        link: "/docs/products/Airdrop/faq",
    },
];

export const DocsSection: DefaultTheme.SidebarItem[] = [
    {
        text: "Welcome",
        link: "/docs/",
    },
];

export default {
    [Products.TECHNOLOGIES.path]: TechnologiesSection,
    [Products.MARKETPLACE.path]: MarketplaceSection,
    [Products.STAKING.path]: StakingSection,
    [Products.WALT.path]: WALTSection,
    [Products.BRIDGE.path]: BridgeSection,
    [Products.AIRDROP.path]: AirdropSection,
    [Products.PLATFORM.path]: PlatformSection,
    [RootSections.DOCS.path]: DocsSection,
} as DefaultTheme.Sidebar;
