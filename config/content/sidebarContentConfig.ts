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
        textIconID: "platform-icon",
    },
};

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
                link:"/docs/products/DecentralizedAIPlatform/DevelopersTutorials/ServiceOnboardingViaPublisher/",
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
        text: "Developer's Tutorials",
        link: "/docs/products/DecentralizedAIPlatform/DevelopersTutorials/ServiceOnboardingViaPublisher/",
        collapsed: true,
        items:[
            {
                text: "Service Onboarding via Publisher",
                link:"/docs/products/DecentralizedAIPlatform/DevelopersTutorials/ServiceOnboardingViaPublisher/",
            },
            {
                text: "Service Onboarding via CLI",
                link:"/docs/products/DecentralizedAIPlatform/DevelopersTutorials/ServiceOnboardingViaCLI/",
            },
            {
                text: "Service Onboarding via TUI",
                link:"/docs/products/DecentralizedAIPlatform/DevelopersTutorials/ServiceOnboardingViaTUI/",
            },
            {
                text: "Full guide to Onboarding in mainnet",
                link:"/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboardingMainnet/",
            },
            {
                text: "Full guide to Onboarding in testnet",
                link:"/docs/products/DecentralizedAIPlatform/DevelopersTutorials/FullGuideOnboardingTestnet/",
            },
            {
                text: "(Coming soon) Integration Training Service",
                link: "/docs/products/DecentralizedAIPlatform/DevelopersTutorials/Training/",
            },
            {
                text: "Integration HTTP Service",
                link: "/docs/products/DecentralizedAIPlatform/DevelopersTutorials/IntegrationHTTPService/",
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
                text: "Daemon setup",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-setup/",
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
                text: "ETCD Setup",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-etcd-setup/",
            },
            {
                text: "Logger & hooks",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-logger/",
            },
            {
                text: "Build daemon",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-build/",
            },
            {
                text: "Daemon API",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/daemon-api/",
            },
            {
                text: "Error codes",
                link: "/docs/products/DecentralizedAIPlatform/Daemon/error-codes/",
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
                        text: "Requirements", 
                        link: "/docs/products/DecentralizedAIPlatform/TUI/GettingStarted/",
                    },
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
                        text: "Menus of TUI",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/",
                    },
                    {
                        text: "Account",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/",
                        collapsed: true,
                        items: [
                            {
                                text: "Account Page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/",
                            },
                            {
                                text: "Identify",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/IdentityPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Identify page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/IdentityPage/",
                                    },
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
                                        text: "Treasurer Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Account/Treasurer/",
                                    },
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
                                text: "Client Page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/",
                            },
                            {
                                text: "Channels menu",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Channels Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/",
                                    },
                                    {
                                        text: "Claim",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ClaimPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Claim Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ClaimPage/",
                                            },
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
                                        text: "Extend",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ExtendPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Extend Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/ExtendPage/",        
                                            },
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
                                        text: "Initialize open",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Initialize open Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/InitializeOpenPage/",
                                            },
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
                                        text: "Print",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Print Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Client/ChannelsMenu/PrintPage/",
                                            },
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
                                text: "Organization Page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/",
                            },
                            {
                                text: "Groups",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/GroupsPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Groups Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/GroupsPage/",
                                    },
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
                                text: "Manage",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/ManagePage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Manage Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/ManagePage/",
                                    },
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
                                text: "Members",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MembersPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Members Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MembersPage/",
                                    },
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
                                text: "Metadata",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Metadata Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Organization/MetadataPage/",
                                    },
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
                                text: "Services Page",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/",
                            },
                            {
                                text: "Manage",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/ManagePage/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Manage Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/ManagePage/",
                                    },
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
                                text: "Metadata",
                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/",
                                collapsed: true,
                                items: [
                                    {
                                        text: "Metadata Page",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/",
                                    },
                                    {
                                        text: "Add/remove",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Add/remove Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/AddRemovePage/",
                                            },
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
                                        text: "Get",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/GetPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Get Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/GetPage/",
                                            },
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
                                        text: "Set",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Set Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/SetPage/",
                                            },
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
                                        text: "Update",
                                        link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/UpdatePage/",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "Update Page",
                                                link: "/docs/products/DecentralizedAIPlatform/TUI/Menus/Services/MetadataMenu/UpdatePage/",
                                            },
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
                        text: "Tutorials on using TUI",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/Tutorials/",
                    },
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
                        text: "FAQ for TUI",
                        link: "/docs/products/DecentralizedAIPlatform/TUI/FAQ/",
                    },
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
        link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-concept/",
        collapsed: true,
        items: [
            {
                text: "SDK Concept",
                link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-concept/",
            },
//             {
//                 text: "Architecture of SDK",
//                 link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-architecture/",
//             },
//             }
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
            },
            {
                text: "UI Sandbox version 1",
                link: "/docs/products/DecentralizedAIPlatform/Sandbox/available-now",
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
        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/glossary/",
        items: [
            {
                text: "Glossary",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/glossary/",
            },
            {
                text: "Introduction",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/MarketplaceEcosystem/marketplace/",
            },
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
            {
                text: "Smart contracts",
                collapsed: true,
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/",
                items: [
                    {
                        text: "Overview",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/",
                    },
                    {
                        text: "MPE",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe/",
                    },
                    {
                        text: "MPE Stateless Client",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/mpe-stateless-client/",
                    },
                    {
                        text: "Registry",
                        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/registry/",
                    },
                ],
            },
        ],
    },
    {
        text: "Used Technologies",
        link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/erc20/",
        collapsed: true,
        items: [
            {
                text: "ERC20",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/erc20/",
            },
            {
                text: "ETCD",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/etcd/",
            },
            {
                text: "Ethereum Address",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/ethereum-address/",
            },
            {
                text: "GRPC",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/grpc/",
            },
            {
                text: "IPFS",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/ipfs/",
            },
            {
                text: "FileCoin",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/filecoin/",
            },
            {
                text: "Protobuf",
                link: "/docs/products/DecentralizedAIPlatform/UsedTechnologies/protobuf/",
            },
            {
                text: "Blockchain",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/blockchain/",
            },
            {
                text: "Ethereum",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/ethereum/",
            },
            {
                text: "AGIX Token and faucet",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/agix-token/",
            },
            {
                text: "Concepts of organization",
                link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/concepts-organization/",
            },
        ],
    },
];

export const MarketplaceSection: DefaultTheme.SidebarItem[] = [
    {
        text: "What is AI Marketplace?",
        link: "/docs/products/AIMarketplace/"
    },
    {
        text: "Registration process",
        link: "/docs/products/AIMarketplace/registration/"
    },
    {
        text: "Services page",
        link: "/docs/products/AIMarketplace/services-page/"
    },
    {
        text: "Service page",
        link: "/docs/products/AIMarketplace/service-page/"
    },
    {
        text: "How to try AI Service for free?",
        link: "/docs/products/AIMarketplace/free-call/"
    },
    {
        text: "Account page",
        link: "/docs/products/AIMarketplace/account-page/"
    },
    {
        text: "Payment methods",
        link: "/docs/products/AIMarketplace/payment-methods/"
    },
    {
        text: "For Consumers",
        collapsed: false,
        link: "/docs/products/AIMarketplace/ForConsumers/",
        items: [
            {
                text: "Platform workshops",
                link: "/docs/products/AIMarketplace/ForConsumers/Platform-workshops/python/",
                collapsed: true,
                items:[
                    {
                        text: "Python",
                        link: "/docs/products/AIMarketplace/ForConsumers/Platform-workshops/python/",
                    },
                    {
                        text: "C++",
                        link: "/docs/products/AIMarketplace/ForConsumers/Platform-workshops/cpp/",
                    },
                    {
                        text: "Go",
                        link: "/docs/products/AIMarketplace/ForConsumers/Platform-workshops/go/",
                    },
                    {
                        text: "Java",
                        link: "/docs/products/AIMarketplace/ForConsumers/Platform-workshops/java/",
                    },
                    {
                        text: "Docker SNET",
                        link: "/docs/products/AIMarketplace/ForConsumers/Platform-workshops/Docker-snet/",
                    },
                ]
            },
            {
                text: "Local SingularityNET",
                link: "/docs/products/AIMarketplace/ForConsumers/local-singularitynet/",
            },
            {
                text: "MetaMask Wallet",
                link: "/docs/products/AIMarketplace/ForConsumers/metamask-wallet/",
            },
            {
                text: "Naming standarts",
                link: "/docs/products/AIMarketplace/ForConsumers/naming-standarts/",
            },
            {
                text: "OpenCog",
                link: "/docs/products/AIMarketplace/ForConsumers/opencog/",
            },
            {
                text: "Earnings",
                link: "/docs/products/AIMarketplace/ForConsumers/earning/",
            },
            {
                text: "Contribution Guidelines",
                link: "/docs/products/AIMarketplace/ForConsumers/contribution-guidelines/",
            },
            {
                text: "Triton Instructions",
                link: "/docs/products/AIMarketplace/ForConsumers/triton-instructions/",
            },
            {
                text: "Troubleshooting",
                link: "/docs/products/AIMarketplace/ForConsumers/troubleshooting/",
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
        text: "Cardano Staking",
        collapsed: true,
        link: "/docs/products/Staking/cardano-staking-withdraw/",
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
            }
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
    [Products.MARKETPLACE.path]: MarketplaceSection,
    [Products.STAKING.path]: StakingSection,
    [Products.WALT.path]: WALTSection,
    [Products.BRIDGE.path]: BridgeSection,
    [Products.AIRDROP.path]: AirdropSection,
    [Products.PLATFORM.path]: PlatformSection,
    [RootSections.DOCS.path]: DocsSection,
} as DefaultTheme.Sidebar;
