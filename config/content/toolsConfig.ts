export interface IToolsSectionItem {
    text: string,
    description: string,
    link: string,
}

export default [
    {
        text: "SNET Contracts",
        description: "Ethereum smart contracts that power the SingularityNet platform",
        link: "https://github.com/singnet/platform-contracts",
    },
    {
        text: "SNET Client",
        description: "A command line utility to interface with the SingularityNet platform",
        link: "https://google.com",
    },
    {
        text: "Daemon",
        description: "Daemon exposes an AI application as an API that is accessible through the SingularityNET platform.",
        link: "https://github.com/singnet/snet-daemon",
    },
    {
        text: "Python SDK",
        description: "Python SDK to invoke AI services on the SingularityNet platform programmatically",
        link: "https://github.com/singnet/snet-sdk-python",
    },
    {
        text: "Java SDK",
        description: "Java SDK to invoke AI services on Java SE and Android platforms",
        link: "https://github.com/singnet/snet-sdk-java",
    },
    {
        text: "SNET TUI",
        description: "Mouse-centric text user interface to simplify interacting with the SingularityNET command line interface",
        link: "https://github.com/singnet/TUI",
    },
] as IToolsSectionItem[]