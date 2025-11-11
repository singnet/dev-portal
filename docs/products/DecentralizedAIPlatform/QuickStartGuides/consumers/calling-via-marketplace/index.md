# Calling AI Services via Marketplace

The AI Marketplace provides the easiest way to discover and interact with AI services through a user-friendly web interface.

## Prerequisites

Before you begin, make sure you have:

- [Completed the Getting Ready checklist](../getting-ready-to-call-ai/)
- Ethereum wallet (MetaMask recommended)
- ETH for gas fees
- ASI (FET) tokens
- Marketplace account

## Quick Start

### 1. Access the Marketplace

Visit [AI Marketplace](https://marketplace.singularitynet.io/) and sign in with your account.

### 2. Browse Services

**Find services by:**
- **Category**: AI/ML, Image Processing, Natural Language, etc.
- **Search**: Use keywords to find specific capabilities
- **Organization**: Filter by service provider
- **Sort**: By popularity, recent updates, or ratings

### 3. View Service Details

Click on any service to see:
- Service description and capabilities
- Pricing information
- Example inputs and outputs
- Provider information
- User reviews and ratings

### 4. Connect Your Wallet

1. Click "Connect Wallet" in the marketplace
2. Select MetaMask (or your preferred wallet)
3. Approve the connection request
4. Your wallet address will appear in the interface

### 5. Deposit Funds

Before calling services, deposit ASI tokens:

1. Navigate to your **Account** page
2. Click **Deposit** button
3. Enter the amount of ASI to deposit
4. Confirm the transaction in MetaMask
5. Wait for blockchain confirmation

**Recommended starting amount**: 100-500 ASI tokens for testing

### 6. Open a Payment Channel

Payment channels enable efficient, low-cost service calls:

1. On the service page, click **Open Channel**
2. Set channel parameters:
   - **Amount**: ASI tokens to allocate
   - **Expiration**: How long the channel remains valid (e.g., 30 days)
3. Confirm the transaction
4. Wait for blockchain confirmation

**Note**: You only pay gas fees once when opening the channel. All subsequent service calls are gasless!

### 7. Call the Service

Once your payment channel is open:

1. Click **Invoke Service** or **Try Service**
2. Configure the input parameters:
   - Upload files if required
   - Fill in text fields
   - Adjust settings
3. Click **Run**
4. View results in the output panel

### 8. Monitor Usage

Track your service usage:
- **Account Page**: View all payment channels
- **Transaction History**: See past service calls
- **Channel Balance**: Monitor remaining funds

---

## Free Calls

Many services offer **free trial calls** to new users:

- Look for the "Free Calls Available" badge
- No payment channel required
- Limited number of calls per user
- Perfect for testing services before committing funds

[Learn more about Free Calls](/docs/products/AIMarketplace/free-call/)

---

## Tips for Effective Service Calls

**Start Small**
- Begin with smaller deposits to test services
- Gradually increase as you become comfortable

**Check Pricing**
- Review cost per call before opening channels
- Consider bulk pricing for frequent use

**Monitor Expiration**
- Payment channels have expiration dates
- Unused funds can be reclaimed after expiration

**Read Documentation**
- Each service has specific input requirements
- Check examples for proper formatting

---

## Troubleshooting

### "Insufficient Balance"
- Deposit more ASI tokens to your account
- Check that your wallet has enough ETH for gas fees

### "Channel Expired"
- Open a new payment channel
- Claim any remaining funds from the expired channel

### "Transaction Failed"
- Ensure sufficient ETH for gas fees
- Check network congestion and increase gas price if needed
- Verify wallet connection

[More Troubleshooting Tips](/docs/products/AIMarketplace/ForConsumers/troubleshooting/)

---

## Next Steps

- [Try Service Training](../service-training/) - Fine-tune models with your data
- [Call via SDK](../calling-via-sdk/) - Integrate services programmatically
- [Explore CLI](../calling-via-cli/) - Use command-line tools

## Related Resources

- [AI Marketplace Guide](/docs/products/AIMarketplace/) - Complete marketplace documentation
- [Payment Methods](/docs/products/AIMarketplace/payment-methods/) - Understanding payment options
- [Account Management](/docs/products/AIMarketplace/account-page/) - Managing your account
