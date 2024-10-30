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
        link: "/docs/products/AboutTechnologies/blockchain/",
    },
    {
        text: "Ethereum",
        link: "/docs/products/AboutTechnologies/ethereum/",
    },
    {
        text: "AGIX Token and faucet",
        link: "/docs/products/AboutTechnologies/agix-token/",
    },
    {
        text: "Concepts of organization",
        link: "/docs/products/AboutTechnologies/concepts-organization/",
    },
    {
        text: "Introduction in SDK",
        link: "/docs/products/AboutTechnologies/sdk/",
    },
];

export const PlatformSection: DefaultTheme.SidebarItem[] = [
    {
        text: "What is Decentralized AI Platform?",
        link:"/docs/products/DecentralizedAIPlatform/",
    },
    {
        text: "I am AI Consumer",
        link: "/docs/products/DecentralizedAIPlatform/IAmAIConsumer/"
    },
    {
        text: "I am AI Developer",
        link: "/docs/products/DecentralizedAIPlatform/IAmAIDeveloper/"
    },
    {
        text: "Quick Start Guides",
        link: "/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToOnboardCheckUp/",
        collapsed: true,
        items: [
            {
                text: "Getting Ready to Onboard CheckUp",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToOnboardCheckUp/",
            },
            {
                text: "Getting Ready to Call AI CheckUp",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/GettingReadyToCallAICheckUp/",
            },
            {
                text: "Service Onboarding via Publisher",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceOnboardingViaPublisher/",
            },
            {
                text: "Service Onboarding via CLI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceOnboardingViaCLI/",
            },
            {
                text: "Service Onboarding via TUI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceOnboardingViaTUI/",
            },
            {
                text: "Service Calling via CLI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaCLI/",
            },
            {
                text: "Service Calling via TUI",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaTUI/",
            },
            {
                text: "Service Calling via SDK",
                link:"/docs/products/DecentralizedAIPlatform/QuickStartGuides/ServiceCallingViaSDK/",
            },
        ],
    },
    {
        text: "Daemon",
        link: "/docs/products/DecentralizedAIPlatform/Daemon/",
        collapsed: true,
        items: [
            {
                text: "What is Daemon?",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/",
            },
            {
                text: "Daemon Setup",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-setup/",
            },
            {
                text: "Daemon API",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-api/",
            },
            {
                text: "Daemon architecture",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-architecture/",
            },
            {
                text: "Daemon Channel Storage",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-channel-storage/",
            },
            {
                text: "Daemon SSL Setup",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-ssl-setup/",
            },
            {
                text: "Build daemon",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-build/",
            },
        ],
    },
    {
        text: "CLI",
        link: "/docs/products/DecentralizedAIPlatform/CLI/",
        collapsed: true,
        items: [
            {
                text: "What is CLI?",
                link: "/docs/products/DecentralizedAIPlatform/CLI/",
            },
            {
                text: "Organization setup via CLI",
                link: "/docs/products/DecentralizedAIPlatform/CLI/organization-setup-snet-cli/",
            },
            {
                text: "Service setup via CLI",
                link: "/docs/products/DecentralizedAIPlatform/CLI/service-setup-snet-cli/",
            },
            {
                text: "Manual",
                link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/",
                collapsed: true,
                items: [
                    {
                        text: "Account",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Account/",
                    },
                    {
                        text: "Channel",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Channel/",
                    },
                    {
                        text: "Client",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Client/",
                    },
                    {
                        text: "Contract",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Contract/",
                    },
                    {
                        text: "Identity",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Identity/",
                    },
                    {
                        text: "Network",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Network/",
                    },
                    {
                        text: "Organization",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Organization/",
                    },
                    {
                        text: "Sdk",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Sdk/",
                    },
                    {
                        text: "Service",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Service/",
                    },
                    {
                        text: "Session",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Session/",
                    },
                    {
                        text: "Set",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Set/",
                    },
                    {
                        text: "Treasurer",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Treasurer/",
                    },
                    {
                        text: "Unset",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Unset/",
                    },
                    {
                        text: "Version",
                        link: "/docs/products/DecentralizedAIPlatform/CLI/Manual/Version/",
                    },
                ],
            },
        ],
    },
    {
        text: "TUI",
        link: "/docs/products/DecentralizedAIPlatform/TUI/",
        collapsed: true,
        items: [
            {
                text: "What is TUI?",
                link: "/docs/products/DecentralizedAIPlatform/TUI/",
            },
            {
                text: "Getting Started",
                link: "/docs/products/DecentralizedAIPlatform/TUI/GettingStarted/",
                collapsed: true,
                items: [
                    {
                        text: "Installation",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/GettingStarted/installation/",
                    },
                    {
                        text: "First time start up",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/GettingStarted/first-time-start-up/",
                    },
                    {
                        text: "Execution",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/GettingStarted/execution/",
                    },
                ],
            },
            {
                text: "Menus",
                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/",
                collapsed: true,
                items: [
                    {
                        text: "Account",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/",
                        collapsed: true,
                        items: [
                            {
                                text: "Identify page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/IdentityPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Create identity page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/IdentityPage/create-identity-page/",
                                        collapsed: true,
                                    },
                                ],
                            },
                            {
                                text: "Treasurer",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/Treasurer/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Claim",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/Treasurer/claim/",
                                        collapsed: true,
                                    },
                                    {
                                        text: "Claim all",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/Treasurer/claim-all/",
                                        collapsed: true,
                                    },
                                    {
                                        text: "Claim expired",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/Treasurer/claim-expired/",
                                        collapsed: true,
                                    },
                                ],
                            },
                            {
                                text: "Deposit",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/deposit/",
                            },
                            {
                                text: "Transfer",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/transfer/",
                            },
                            {
                                text: "Withdraw",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/withdraw/",
                            },
                        ],
                    },
                    {
                        text: "Client",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/",
                        collapsed: true,
                        items: [
                            {
                                text: "Channels menu",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Claim page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ClaimPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Claim timeout",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ClaimPage/claim-timeout/",
                                            },
                                            {
                                                text: "Claim all timeout",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ClaimPage/claim-all-timeout/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Extend page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ExtendPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Extend add",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ExtendPage/extend-add/",
                                            },
                                            {
                                                text: "Extend add organization",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ExtendPage/extend-add-organization/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Initialize open page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Initialize",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/initialize/",
                                            },
                                            {
                                                text: "Initialize metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/initialize-metadata/",
                                            },
                                            {
                                                text: "Open initialize",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/open-initialize/",
                                            },
                                            {
                                                text: "Open initialize metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/open-initialize-metadata/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Print page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Print all channels filter group",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/print-all-channels-filter-group/",
                                            },
                                            {
                                                text: "Print all channels filter sender",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/print-all-channels-filter-sender/",
                                            },
                                            {
                                                text: "Print all channels filter group sender",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/print-all-channels-filter-group-sender/",
                                            },
                                            {
                                                text: "Print all channels filter group recipient",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/print-all-channels-filter-recipient/",
                                            },
                                            {
                                                text: "Print initialized channels",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/print-initialized-channels/",
                                            },
                                            {
                                                text: "Print initialized channels filter organization",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/print-initialized-channels-filter-organization/",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                text: "Call",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/call/",
                            },
                            {
                                text: "Call low level",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/call-low-level/",
                            },
                            {
                                text: "Get channel state",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/get-channel-state/",
                            },
                        ],
                    },
                    {
                        text: "Organization",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/",
                        collapsed: true,
                        items: [
                            {
                                text: "Groups page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/GroupsPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Add a group",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/GroupsPage/add-a-group/",
                                    },
                                    {
                                        text: "Update group",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/GroupsPage/update-group/",
                                    },
                                ],
                            },
                            {
                                text: "Manage page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/ManagePage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Create organization",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/ManagePage/create-organization/",
                                    },
                                    {
                                        text: "Delete organization",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/ManagePage/delete-organization/",
                                    },
                                ],
                            },
                            {
                                text: "Members page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MembersPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Manage members",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MembersPage/manage-members/",
                                    },
                                    {
                                        text: "Change organization owner",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MembersPage/change-organization-owner/",
                                    },
                                ],
                            },
                            {
                                text: "Metadata page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Add description",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/add-description/",
                                    },
                                    {
                                        text: "Initialize metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/initialize-metadata/",
                                    },
                                    {
                                        text: "Manage assets",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/manage-assets/",
                                    },
                                    {
                                        text: "Manage contacts",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/manage-contacts/",
                                    },
                                    {
                                        text: "Print metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/print-metadata/",
                                    },
                                    {
                                        text: "Update metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/update-metadata/",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        text: "Services",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/",
                        collapsed: true,
                        items: [
                            {
                                text: "Manage page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/ManagePage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Publish Service",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/ManagePage/publish-service/",
                                    },
                                    {
                                        text: "Delete service",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/ManagePage/delete-service/",
                                    },
                                ],
                            },
                            {
                                text: "Metadata menu",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Add/remove page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Add/remove description",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/add-service-description/",
                                            },
                                            {
                                                text: "Add/remove daemon address",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/add-remove-daemon-address/",
                                            },
                                            {
                                                text: "Add/remove service metadata assets",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/add-remove-service-metadata-assets/",
                                            },
                                            {
                                                text: "Add/remove service metadata groups",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/add-remove-service-metadata-groups/",
                                            },
                                            {
                                                text: "Add/remove service metadata media",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/add-remove-service-metadata-media/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Get page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/GetPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Service status",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/GetPage/service-status/",
                                            },
                                            {
                                                text: "API metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/GetPage/api-metadata/",
                                            },
                                            {
                                                text: "API registry",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/GetPage/api-registry/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Set page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Set fixed price",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/set-fixed-price/",
                                            },
                                            {
                                                text: "Set free calls",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/set-free-calls/",
                                            },
                                            {
                                                text: "Set free call signer address",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/set-free-call-signer-address/",
                                            },
                                            {
                                                text: "Set method price",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/set-method-price/",
                                            },
                                            {
                                                text: "Set model",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/set-model/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Update page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/UpdatePage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Update service daemon address",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/UpdatePage/update-service-daemon-address/",
                                            },
                                            {
                                                text: "Update metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/UpdatePage/update-metadata/",
                                            },
                                            {
                                                text: "Validate metadata",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/UpdatePage/validate-metadata/",
                                            },
                                        ],
                                    },
                                    {
                                        text: "Initialize service metadata",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/initialize-service-metadata/",
                                    },
                                ],
                            },
                            {
                                text: "View all page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/view-all-page/",
                            },
                        ],
                    },
                    {
                        text: "Custom command",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/custom-command/",
                    },
                ],
            },
            {
                text: "Tutorials",
                link: "/docs/products/DecentralizedAIPlatform/TUI/Tutorials/",
                collapsed: true,
                items: [
                    {
                        text: "Adding funds to wallet",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Tutorials/adding-funds-to-wallet/",
                    },
                    {
                        text: "Invoke a service with the TUI",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Tutorials/invoke-a-service-with-the-tui/",
                    },
                    {
                        text: "Opening and Initializing a payment channel",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Tutorials/opening-and-initializing-a-payment-channel/",
                    },
                ],
            },
            {
                text: "FAQ",
                link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/",
                collapsed: true,
                items: [
                    {
                        text: "Could not retrieve Account information",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/could-not-retrieve-account-information/",
                    },
                    {
                        text: "How do I select text, and copy/paste?",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/how-do-i-select-text-and-copy-paste/",
                    },
                    {
                        text: "I want to use my keyboard instead of my mouse!",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/i-want-to-use-my-keyboard-instead-of-my-mouse/",
                    },
                    {
                        text: "JSON Serialization on Windows",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/json-serialization-on-windows/",
                    },
                    {
                        text: "The TUI looks really bad on my screen! What do I do?",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/the-tui-looks-really-bad-on-my-screen-what-do-i-do/",
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
                text: "What is Publisher?",
                link: "/docs/products/DecentralizedAIPlatform/PublisherPortal/",
            },
            {
                text: "Text Quickstart Guide",
                link: "/docs/products/DecentralizedAIPlatform/PublisherPortal/text-guide/",
            },
            {
                text: "Video Quickstart Guide",
                link: "/docs/products/DecentralizedAIPlatform/PublisherPortal/video-guide/",
            },
        ],
    },
    {
        text: "SDK",
        link: "/docs/products/DecentralizedAIPlatform/SDK/",
        collapsed: true,
        items: [
//             {
//                 text: "Architecture of SDK",
//                 link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-architecture/",
//             },
            {
                text: "Python SDK",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/",
                items: [
                    {
                        text: "Getting started guide",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/",
                    },
                    {
                        text: "Calculator example",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/calculator/",
                    },
                    {
                        text: "Console App example",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/console-app/",
                    },
                    {
                        text: "Documentation",
                        collapsed: true,
                        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/",
                        items: [
                            {
                                text: "init",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/init/",
                            },
                            {
                                text: "account",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/account/",
                            },
                            {
                                text: "service_client",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/service-client/",
                            },
                            {
                                text: "config",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/config/",
                            },
                            {
                                text: "client_lib_generator",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/client-lib-generator/",
                            },
                            {
                                text: "concurrency_manager",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/concurrency-manager/",
                            },
                            {
                                text: "service_metadata",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/service-metadata/",
                            },
                            {
                                text: "storage_provider",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/storage-provider/",
                            },
                            {
                                text: "mpe_contract",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/mpe-contract/",
                            },
                            {
                                text: "payment_channel",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/payment-channel/",
                            },
                            {
                                text: "payment_channel_provider",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/payment-channel-provider/",
                            },
                            {
                                text: "payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/payment-strategy/",
                            },
                            {
                                text: "default_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/default-payment-strategy/",
                            },
                            {
                                text: "freecall_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/freecall-payment-strategy/",
                            },
                            {
                                text: "paidcall_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/paidcall-payment-strategy/",
                            },
                            {
                                text: "prepaid_payment_strategy",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/prepaid-payment-strategy/",
                            },
                            {
                                text: "training",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/training/",
                            },
                            {
                                text: "utils",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/utils/",
                            },
                            {
                                text: "ipfs_utils",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/Documentation/ipfs-utils/",
                            },
                        ],
                    },
                ],
            },
            {
                text: "Javascript SDKs",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/",
                items: [
                    {
                        text: "WebJS SDK",
                        link:"/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/",
                        collapsed: true,
                        items:[
                            {
                                text: "Getting started guide",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/getting-started-guide/",
                            },
                            {
                                text: "Calculator example",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/calculator/",
                            },
                            {
                                text: "Service info and Metamask wallet",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/WebJsSDK/service-info/",
                            },
                        ],
                    },
                    {
                        text: "NodeJS SDK",
                        link:"/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/NodeJsSDK/getting-started-guide/",
                        collapsed: true,
                        items:[
                            {
                                text: "Getting started guide",
                                link: "/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/NodeJsSDK/getting-started-guide/",
                            },
                        ],
                    },
                    {
                        text: "Generating Stubs for JS",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/JavascriptSDKs/generating-stubs/",
                    },
                ]
            },
            {
                text: "Java SDK",
                link:"/docs/products/DecentralizedAIPlatform/SDK/JavaSDK/getting-started-guide/",
                collapsed: true,
                items:[
                    {
                        text: "Getting started guide",
                        link: "/docs/products/DecentralizedAIPlatform/SDK/JavaSDK/getting-started-guide/",
                    },
                ],
            },
        ],
    },
    {
        text: "UI Sandbox",
        link: "/docs/products/DecentralizedAIPlatform/Sandbox/",
        collapsed: true,
        items: [
            {
                text: "What is UI Sandbox?",
                link: "/docs/products/DecentralizedAIPlatform/Sandbox/",
            }
        ],
    },
    {
        text: "UI Boilerplate",
        link: "/docs/products/DecentralizedAIPlatform/Boilerplate/",
        collapsed: true,
        items: [
            {
                text: "What is Boilerplate?",
                link: "/docs/products/DecentralizedAIPlatform/Boilerplate/",
            },
            { 
                text: "Getting Started",
                link: "/docs/products/DecentralizedAIPlatform/Boilerplate/GettingStarted/",
            },
            { 
                text: "Using guide",
                link: "/docs/products/DecentralizedAIPlatform/Boilerplate/UserGuide/",
            }
        ],
    },
    {
        text: "Core concepts",
        collapsed: true,
        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/keyterms/",
        items: [
            {
                text: "Marketplace ecosystem",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace/",
                items: [
                    {
                        text: "Service",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/service/",
                    },
                    {
                        text: "Explanation of Daemon",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/daemon/",
                    },
                    {
                        text: "Marketplace service invocation",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace-service_invocation/",
                    },
                    {
                        text: "Marketplace service training",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace-service_training/",
                    },
                ],
            },
            {
                text: "Smart contracts",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/",
                items: [
                    {
                        text: "MPE",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe/",
                    },
                    {
                        text: "MPE Stateless Client",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe-stateless-client/",
                    },
                ],
            },
            {
                text: "ERC20",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/erc20/",
            },
            {
                text: "ETCD",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/etcd/",
            },
            {
                text: "Ethereum Address",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/ethereum-address/",
            },
            {
                text: "GRPC",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/grpc/",
            },
            {
                text: "IPFS",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/ipfs/",
            },
            {
                text: "FileCoin",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/filecoin/",
            },
            {
                text: "Protobuf",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/protobuf/",
            },
            {
                text: "ETCD Setup",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/etcdsetup/",
            },
        ],
    },
    {
        text: "Used Technologies",
        link: "",
        collapsed: true,
        items: [],
    },
];

export const MarketplaceSection: DefaultTheme.SidebarItem[] = [
    {
        text: "Marketplace",
        collapsed: true,
        link:"/docs/products/AIMarketplace/Overview/what-is-aimarketplace/",
        items:[
            {
                text: "What is AIMarketplace?",
                link: "/docs/products/AIMarketplace/Overview/what-is-aimarketplace/"
            },
            {
                text: "Registration process",
                link: "/docs/products/AIMarketplace/Overview/registration/"
            },
            {
                text: "Services page",
                link: "/docs/products/AIMarketplace/Overview/services-page/"
            },
            {
                text: "Service page",
                link: "/docs/products/AIMarketplace/Overview/services-page/"
            },
            {
                text: "Free calls",
                link: "/docs/products/AIMarketplace/Overview/free-call/"
            },
            {
                text: "Account page",
                link: "/docs/products/AIMarketplace/Overview/account-page/"
            },
            {
                text: "Payment methods",
                link: "/docs/products/AIMarketplace/Overview/payment-methods"
            },
        ]
    },
    {
        text: "For comers",
        collapsed: false,
        link: "/docs/products/AIMarketplace/Forcomers/",
        items: [
            {
                text: "Platform workshops",
                link: "/docs/products/AIMarketplace/Forcomers/Platform-workshops/python/",
                collapsed: true,
                items:[
                    {
                        text: "Python",
                        link: "/docs/products/AIMarketplace/Forcomers/Platform-workshops/python/",
                    },
                    {
                        text: "C++",
                        link: "/docs/products/AIMarketplace/Forcomers/Platform-workshops/cpp/",
                    },
                    {
                        text: "Go",
                        link: "/docs/products/AIMarketplace/Forcomers/Platform-workshops/go/",
                    },
                    {
                        text: "Java",
                        link: "/docs/products/AIMarketplace/Forcomers/Platform-workshops/java/",
                    },
                    {
                        text: "Docker SNET",
                        link: "/docs/products/AIMarketplace/Forcomers/Platform-workshops/Docker-snet/",
                    },
                ]
            },
            {
                text: "Call a service",
                link: "/docs/products/AIMarketplace/Forcomers/call-a-service/",
            },
            {
                text: "Integration",
                link: "/docs/products/AIMarketplace/Forcomers/integration/",
            },
            {
                text: "Local Singularity",
                link: "/docs/products/AIMarketplace/Forcomers/local-singularitynet/",
            },
            {
                text: "MetaMask",
                link: "/docs/products/AIMarketplace/Forcomers/metamask/",
            },
            {
                text: "OpenCog",
                link: "/docs/products/AIMarketplace/Forcomers/opencog/",
            },
            {
                text: "Organization",
                link: "/docs/products/AIMarketplace/Forcomers/organization/",
            },
            {
                text: "Publish",
                link: "/docs/products/AIMarketplace/Forcomers/publish/",
            },
            {
                text: "RasberryPI",
                link: "/docs/products/AIMarketplace/Forcomers/raspberrypi/",
            },
            {
                text: "Registry",
                link: "/docs/products/AIMarketplace/Forcomers/registry/",
            },
            {
                text: "Requirements",
                link: "/docs/products/AIMarketplace/Forcomers/requirements/",
            },
            {
                text: "Setup Guide",
                link: "/docs/products/AIMarketplace/Forcomers/setupguide/",
            },
            {
                text: "Wallet",
                link: "/docs/products/AIMarketplace/Forcomers/wallet/",
            },
            {
                text: "Claim",
                link: "/docs/products/AIMarketplace/Forcomers/claim/",
            },
            {
                text: "PayPal",
                link: "/docs/products/AIMarketplace/Forcomers/paypal/",
            },
            {
                text: "Guide for testnet",
                link: "/docs/products/AIMarketplace/Forcomers/snet-full-guide-testnet/",
            },
            {
                text: "Guide for mainnet",
                link: "/docs/products/AIMarketplace/Forcomers/snet-full-guide-mainnet/",
            },
            {
                text: "FAQ",
                link: "/docs/products/AIMarketplace/Forcomers/faq/",
            },
            {
                text: "Troubleshooting",
                link: "/docs/products/AIMarketplace/Forcomers/troubleshooting/",
            },
        ],
    },
];

export const StakingSection: DefaultTheme.SidebarItem[] = [
    {
        text: "What is Staking?",
        link:"/docs/products/Staking/",
    },
    {
        text: "Ethereum Staking",
        collapsed: true,
        items: [
            {
                text: "Stake window",
                link: "/docs/products/Staking/stake-window/",
            },
            {
                text: "Stake timeline",
                link: "/docs/products/Staking/stake-timeline/",
            },
            {
                text: "Stake reward",
                link: "/docs/products/Staking/stake-reward/",
            },
            {
                text: "Stake opt out",
                link: "/docs/products/Staking/stake-opt-out/",
            },
        ],
    },
    {
        text: "Cardano Staking",
        collapsed: true,
        items: [
            {
                text: "Cardano Staking withdraw",
                link: "/docs/products/Staking/cardano-staking-withdraw/",
            },
            {
                text: "Cardano Staking Timeline",
                link: "/docs/products/Staking/cardano-staking-timeline/",
            },
            {
                text: "Cardano Staking Rewards",
                link: "/docs/products/Staking/cardano-staking-rewards/",
            },
            {
                text: "Cardano Staking withdraw NTX",
                link: "/docs/products/Staking/cardano-staking-withdraw-ntx/",
            },
            {
                text: "Cardano Staking Timeline NTX",
                link: "/docs/products/Staking/cardano-staking-timeline-ntx/",
            },
            {
                text: "Cardano Staking Rewards NTX",
                link: "/docs/products/Staking/cardano-staking-rewards-ntx/",
            },
        ],
    },
];

export const WALTSection: DefaultTheme.SidebarItem[] = [
    {
        text: "What is WaLT?",
        link:"/docs/products/WaLT/",
    },
    {
        text: "How to Use",
        link: "/docs/products/WaLT/howtouse/",
    },
    {
        text: "Frequently Asked Questions",
        link: "/docs/products/WaLT/faq/",
    },
];

export const BridgeSection: DefaultTheme.SidebarItem[] = [
    {
        text: "What is Bridge?",
        link:"/docs/products/Bridge/",
    },
    {
        text: "Selecting Networks",
        link: "/docs/products/Bridge/selecting-networks/",
    },
    {
        text: "Troubles",
        link: "/docs/products/Bridge/troubles/",
    },
    {
        text: "FAQ",
        link: "/docs/products/Bridge/faq/",
    },
    {
        text: "Ethereum-Binance",
        link: "/docs/products/Bridge/eth-to-binance/",
    },
];

export const AirdropSection: DefaultTheme.SidebarItem[] = [
    {
        text: "What is AirDrop?",
        link:"/docs/products/Airdrop/",
    },
    {
        text: "Registration",
        link: "/docs/products/Airdrop/Registration/",
        collapsed: true,
        items: [
            {
                text: "Connect wallet",
                link: "/docs/products/Airdrop/Registration/connect-wallet/",
            },
            {
                text: "Register",
                link: "/docs/products/Airdrop/Registration/register/",
            },
        ],
    },
    {
        text: "Claim",
        link: "/docs/products/Airdrop/claim/",
    },
    {
        text: "FAQ",
        link: "/docs/products/Airdrop/faq/",
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
