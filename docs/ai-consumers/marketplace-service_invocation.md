---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: AI Consumers

# extralink box
extralink:
    title: All Docs
    title_url: '/docs'
    external_url: false
    description: Find an overview of our full documentation here.

# Market Place
dev_news: true

# Micro navigation
micro_nav: true

# Page navigation
page_nav:
    prev:
        content: Concepts Overview
        url: '/docs/concepts'
    next:
        content: SingularityNET Services
        url: '/docs/concepts/service'
---

## Calling a Service

The Marketplace offers a free trial version, where registered users can access service(s) for a specified time period. After the expiration time period of the trial version, install an Ethereum browser extension, such as MetaMask. This extension mediates with the Blockchain on behalf, helping you in transferring of tokens between wallets, and invoke contracts.
Example: The sample service below shows the SingularityNET  platform can authorize Metamask:

- Select a Wallet -
![marketplace](/assets/img/dapp/select_awallet.png)


- Select Metamask -
![marketplace](/assets/img/dapp/authorize_metamask.png)

**Important**: Metamask is a plugin which is used by the SingularityNET platform. 

This extension, allows you to perform the following in the context of the marketplace:

- Transfer AGI funds into escrow, 
- Setup payment channels to enable calls to any of the listed services.



### Depositing tokens from Metamask to the Singularity Escrow Wallet.

Steps
1.	Let start by depositing some tokens from Metamask to the Singularity Escrow Wallet. So you can pay for service
2.	On the Home page click on Account link
3.	Confirm you have sufficient balance in your Metamask Wallet
4.	In your Account details, check the Total Balance, This is the number AGI token you have in Metamask wallet
5.	In the Manage your Escrow account section, Enter the amount of money you want to deposit to the Escrow wallet
6.	Click Deposit. A Metamask Window should pop-up. If it Metamask Window does not pop-up, click on the Metamask icon on the top of your browser.
7.	Check the transaction and click confirm.
8.	Wait for the transactions to be mined.
9.	This is two step transactions; you will need to confirm both steps.(Gas fee and Total)
10.	Wait for the transactions to be mined again
11.	Confirmation message show that the token has been deposited to the Escrow wallet 
12.	You might need to refresh if your token still appears as authorized.

### To  call a service

1.	View a list of service from the home page.
2.	Filter the list by using the search text box.
3.	Look for  image recognition service
4.	Click on **Details**. 
    An overview dialog box displays on the right. On the top you can view a brief description of the service.
5.	The below section shows the amount that will be deposited in the payment channel and the blocknumber when the block will expire
6.	Click on the **Start job**
    This will ask for a signature on the Metamask, since you will be opening a Payment channel
8.	Click Sign, followed by reserved funds. 
    You must edit the Amount and Expiration before confirming this step. And wait for it to be mined.
9.	Now you have the access to the invoke section of the service 
    The interface will change according to the input need for each service.
11.	Choose a Method to identify the service -  An Image
12.	After setting-up all that you need,  click the **Invoke**.
13.	Sign the Metamask transaction to send the service to the Blockchain
14.	Wait for the response
15.	You can up vote or down vote hope on the decentralized market curation

Not only have bought service, you have also opened a Payment channel with it and continue to use until it expires. 

### claim back the reserved fund
1.	Go the **Account** page
    If there is any expired channel it displays under the **Expired Channel Details** section
3.	Select the channel you want to claim
4.	Click **Claim Channel**
5.	Confirm this transaction on Metamask
6.	Wait for it to mined
    Displays the message confirming that funds have been successfully claimed.  Once you do this, the payment channel you claimed is unlisted.

### Withdraw tokens from Escrow wallet to Metamask
1.	Go to the **Account** page
2.	In the**Manage your Escrow account** section, select  **Withdraw**
3.	Confirm that you have sufficient funds in the Escrow wallet.
4.	Enter the money you want to withdraw and click **Withdraw**
5.	Confirm this transaction on the Metamask
6.	Wait for it to be mined
    A message displays that the withdraw has been successful
8.	Refresh the page to see the balance is updated.
    You will be able to see the token back in to your Metamask wallet. 


## Marketplace Requirements

If you are a service author, need the service to be visible to others and listed on the marketplace you must:
1.	Build and publish your service 
2.	Use SSL with the snet-daemon. 
    **Note:** if you don't already have an SSL certificate for your domain, it is recommend you use certbot and letsencrypt .
3.	Fork the snet-dapp repo, build a react component as the user interface for your service, and submit a pull request. 
    **Note:** Identify the services on your networks, organization and service names being used. For more details, refer to dapp repo README.md.
4.	Last is some paperwork that we are still finalising, and we'll update this list when we have that. If you are itching to get your service listed, reach out to us via one of our community groups.
    **Note** that your service can be published to SingularityNET without being listed on the marketplace, but your service may be less discoverable to potential customers if it is not listed. 
