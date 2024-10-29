export interface IToolsSectionItem {
    text: string,
    description: string,
    gitLink: string,
    link: string,
}

export default [
    {
        text: "Smart Contracts",
        description: "Ethereum smart contracts that power the SingularityNET platform",
        gitLink: "https://github.com/singnet/platform-contracts",
        link: "/docs/products/DecentralizedAIPlatform/CoreConcepts/SmartContracts/"
    },
    {
        text: "CLI",
        description: "A command line utility to interface with the SingularityNET platform",
        gitLink: "https://github.com/singnet/snet-cli",
        link: "/docs/products/DecentralizedAIPlatform/CLI/"
    },
    {
        text: "TUI",
        description: "Mouse-centric text user interface to simplify interacting with the SingularityNET command line interface",
        gitLink: "https://github.com/singnet/TUI",
        link: "/docs/products/DecentralizedAIPlatform/TUI/"
    },
    {
        text: "Daemon",
        description: "Daemon exposes an AI application as an API that is accessible through the SingularityNET platform.",
        gitLink: "https://github.com/singnet/snet-daemon",
        link: "/docs/products/DecentralizedAIPlatform/Daemon/"
    },
    {
        text: "Python SDK",
        description: "Python SDK to invoke AI services on the SingularityNET platform programmatically",
        gitLink: "https://github.com/singnet/snet-sdk-python",
        link: "/docs/products/DecentralizedAIPlatform/SDK/PythonSDK/getting-started-guide/"
    },
    {
        text: "JavaScript Web SDK",
        description: "Integrate SingularityNET services seamlessly into Web applications",
        gitLink: "https://github.com/singnet/snet-sdk-js/tree/master/packages/web",
        link: "/docs/products/DecentralizedAIPlatform/SDK/WebJsSDK/getting-started-guide/"
    },
    {
        text: "JavaScript Node SDK",
        description: "Integrate SingularityNET services seamlessly into Node.js applications",
        gitLink: "https://github.com/singnet/snet-sdk-js/tree/master/packages/nodejs",
        link: "/docs/products/DecentralizedAIPlatform/SDK/NodeJsSDK/getting-started-guide/"
    },
    {
        text: "Java SDK",
        description: "Java SDK to invoke AI services on Java SE and Android platforms",
        gitLink: "https://github.com/singnet/snet-sdk-java",
        link: "/docs/products/DecentralizedAIPlatform/SDK/sdk-java"
    },
    {
        text: "Boilerplate",
        description: "The project demonstrates the integration of snet-sdk-web, focusing on wallet management and service utilization within the SingularityNET ecosystem",
        gitLink: "https://github.com/singnet/ICP-boilerplate",
        link: "/docs/products/DecentralizedAIPlatform/Boilerplate/"
    },
] as IToolsSectionItem[]