---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers

# Micro navigation
micro_nav: true

---
## SingularityNET’s Decentralized AI Marketplace Integration with PayPal

The integration of SingularityNET’s decentralized AI marketplace with PayPal represents a significant step in the direction of wide adoption of the platform. It makes it easier for more AI users to leverage the platform, thus increasing the likelihood that data scientists and developers will feel incentivized to consider SingularityNET a viable alternative pathway to monetize their expertise. This integration represents a large opportunity for SingularityNET and our community.

Whatever happens on Blockchain, an event is created, and the Marketplace listens to all events.  When there is an event notification, the Marketplace reads the Organization metadata and serviice metadata for example, and retrives the data from the Blockchain and stores them in the local tables, or database. 

The Markplace URL page which is designed by the SingularityNET, manages and displays all the information available from Marketplace database.
the SingularityNET platform is open and decentralized, the Marketplace is the SingularityNET Foundation's curated view. 

This allows the foundation to adhere to legal requirements of different legislative regions. So whenever an events resides in the local table, they need to be reviewed and approved. 

This waiting period is known as Curative process. Only after the successful it has been approved; the service becomes available in the Marketplace. 

**Note**: You can also go to the Marketplace and pay the price through Paypal. I such case, the entire process is managed at the background automatically for you.

The protofile  information associated IPFS hash are so complex to understand. But because they are part of the UI, it becomes user-friendly way to build the  UI components around a service and host it on SingularityNET platform. 

This becomes easy for the user to the Input values that need to be sent and view the computed expected result in the Output field, even without knowing the complexity of the gRPC call and the proto that is associated to the service and so.  So when you click the Invoke button the AI service computes the result 

This service is integrated with the Multiparty Escrow, allowing the user to pay for the service uisng Paypal, that allows the  application to manage.

For example, If you look at the Sample service under the Organization in the Marketplace, you will notice that it shows that you have utilized the free trial service period. 

You can choose an option from the following list :

- Select a Walley
- General Account Wallet 
= Metamask

Choose a Metamask.

By selecting this option,yYou are Authorizing SingularityNET to use Metamask. Metamask is a plugin which can be used as an Wallet. It is coming from Ethereum Blockchain, so you can add money, any crypto currency or tokens to this Wallet.  

For example if I want to move the money into my account, you need to do a Blockchain Operation. Or need to move money from your account to channel, into my account, which involves some additional charges, 

As an AI consumer you can choose to:
- create a Wallet
- use a Metamask

The Marketplace offers a free trial version, where registered users can access service(s) for a specified time period. After the expiration time period of the trial version, install an Ethereum browser extension, such as MetaMask. 

This extension mediates with the Blockchain on behalf, and helps you in transferring of tokens between wallets, and invoke contracts.

**Note**: Service metadata is a place where the price of the service is set and it is on the Blockchain.

The service provider needs to publish the details about the service in the Blockchain.

As a consumer, you may go the Blockchain or the Marketplace portal where the services are deployed.

All service metadata details are stored in the the JSON file
- Create a JSON file - information about the image, service type, description, price of the service, the endpoint and how to make a request.
- Singularity platform works on gRPC. Whenever you need to call you need a protofile.
- File management system such as IPFS stores the location of the hash and points to the associated protofile
    The IPFS can include a file and the same file returns same hash. 

### How to use service by paying through PayPal

1.	Go to the Marketplace portal
2.	Pay service through your Paypal 
3.	Use Faucet to convert to crypto currency details
4.	The application send the equal token in to wallet and then to Channel
5.	Now you can make a call now - the call is based on proto.

### Depositing  tokens from Metamask to the Singularity Escrow Wallet.

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