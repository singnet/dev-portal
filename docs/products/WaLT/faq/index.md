# **FAQ: WaLT**

<AccordionItem :id="1">
    <template #title>
        <strong>1. What is my Collection ID?</strong>
    </template>
    <template #description>
        All wallets that you connect to the tool are linked to a master ID. This is your ‘Collection ID’. You can use this ID in other platforms as part of your profile. This enables the platform to relate your voting behavior and/or your wallet balances to your platform behavior.
    </template>
</AccordionItem>

<AccordionItem :id="2">
    <template #title>
        <strong>2. How does this tool help me in a voting event?</strong>
    </template>
    <template #description>
        If you have AGIX in multiple wallets, possibly even across chains, such as AGIX on Cardano and AGIX on Ethereum you can use the Wallet Linking Tool to have all your AGIX accounted for when we calculate the voting outcomes. Without the tool, you would need to go through the entire voting process multiple times, with different wallets connected. With the tool, you can simply sign in once with multiple wallets and go through the voting process with any one of the linked wallets connected to the voting portal.
    </template>
</AccordionItem>

<AccordionItem :id="3">
    <template #title>
        <strong>3. How does this all work in the background?</strong>
    </template>
    <template #description>
        The process is very simple. When you create a vote, you need to sign with your wallet. No AGIX is used, but we can confidently relate your vote to a wallet ID. When we create a snapshot of all wallets we know how much AGIX is related to this wallet. With the Wallet Linking Tool, we are creating a ‘Keychain’ with a single ID. This ID is associated with all the wallets you have connected. So when we create a snapshot we can create a sum of all AGIX across all wallets related to the same ID, and use that for our voting weight calculations.
    </template>
</AccordionItem>

<AccordionItem :id="4">
    <template #title>
        <strong>4. Can anyone see my balances and my wallet ID's?</strong>
    </template>
    <template #description>
        No. This information is only visible to a limited amount of people who need this access to make voting or other balance-based calculations. This information is not shared with any other parties.
    </template>
</AccordionItem>

<AccordionItem :id="5">
    <template #title>
        <strong>5. Can I remove wallets from the tool?</strong>
    </template>
    <template #description>
        Yes, you can add and remove wallets as much as you want. You are in full control. But please be aware that when you remove the last wallet, your Collection ID will also be deleted. This means that any data that is associated with this ID (such as reputation ratings) will be considered lost. For this reason, we advise to always keep at least one wallet connected. This can be an empty wallet, as long as you have signed in with it.
    </template>
</AccordionItem>

<AccordionItem :id="6">
    <template #title>
        <strong>6. What happens when I remove all wallets?</strong>
    </template>
    <template #description>
        When you remove the last wallet, your Collection ID will also be deleted. This means that any data that is associated with this ID (such as reputation ratings) will be considered lost. For this reason, we advise to always keep at least one wallet connected. This can even be an empty wallet.
    </template>
</AccordionItem>

<AccordionItem :id="7">
    <template #title>
        <strong>7. Why can I only add one Nami/ Eternl/Gero/Flint wallet?</strong>
    </template>
    <template #description>
        You can add as many wallets of each type as you want. Within one extension (e. g. Eternl) you can create several wallets. To add multiple wallets by using single extension to a collection, you must switch the active wallet in the extension before adding.
    </template>
</AccordionItem>

<AccordionItem :id="8">
    <template #title>
        <strong>8. The address is not in the collection, why doesn’t it connect?</strong>
    </template>
    <template #description>
        Each wallet has a unique stake key which identifies the wallet. Each stake key is associated with several addresses. Even if you change the address in the wallet settings, the stake key will remain unchanged and your wallet will not be new for the collection. When you try to re-add this wallet to the collection you will see the error 'You have been connected this wallet already. Please switch account.'
    </template>
</AccordionItem>

<AccordionItem :id="9">
    <template #title>
        <strong>9. What is the difference between Stake key and Address?</strong>
    </template>
    <template #description>
        There is only one stake key in the wallet and it starts with ‘stake_’. There are several addresses in the wallet and they start with ‘addr’. The stake key for the wallet is unchanged. The address can be changed in the wallet settings.
    </template>
</AccordionItem>

<AccordionItem :id="10">
    <template #title>
        <strong>10. What about Ledger for Cardano?</strong>
    </template>
    <template #description>
        At the moment, the Cardano wallet on Ledger cannot be connected to the collection, because extensions that allow you to import Ledger do not have the functionality for signing messages, which is necessary to confirm the wallet.
    </template>
</AccordionItem>

<AccordionItem :id="11">
    <template #title>
        <strong>11. What about Ledger for Ethereum?</strong>
    </template>
    <template #description>
        You can import Ledger into Metamask and connect it to collection.
    </template>
</AccordionItem>

<AccordionItem :id="12">
    <template #title>
        <strong>12 .Is the tool safe to use?</strong>
    </template>
    <template #description>
        Absolutely! You are always in control and the only data that is stored is a collection of wallet IDs with a central identifier. In the future, we might offer to add other data, such as an approved KYC. This will however be fully optional. You will always have full ownership of the connected data and can delete or add this as often as you want.
    </template>
</AccordionItem>

<AccordionItem :id="13">
    <template #title>
        <strong>13 .Are there any costs associated to the tool?</strong>
    </template>
    <template #description>
        No costs at all. For signing we are not creating a transaction, meaning that no tokens need to change hands. There are also no other costs associated with using the tool, nor any plans to have this in the future.
    </template>
</AccordionItem>

<AccordionItem :id="14">
    <template #title>
        <strong>14. What data is stored on chain?</strong>
    </template>
    <template #description>
        Currently, we do not require transactions to be made, so no data is stored on chain. If more transparency is required in the future this might change at some point. 
    </template>
</AccordionItem>  