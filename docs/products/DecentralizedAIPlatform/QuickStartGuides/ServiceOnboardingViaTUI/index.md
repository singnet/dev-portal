# Service Onboarding via TUI

## Step 1: Install

Start by cloning the Github repo with the following command
:::code_group
```sh
cd <FolderPath>
git clone https://github.com/singnet/TUI.git
```

## Step 2: Execute script

After cloning the repo, all you have to do is call the "run" script designed for your operating system.

:::code-group
```powershell [Windows]
cd <TUI Repo Path>
# Call the run script
.\windows_run.bat
```
```sh [Linux]
cd <TUI Repo Path>
# make the script executable
chmod +x linux_run.sh
# Call the run script
./linux_run.sh
```
```sh [MacOS]
cd <TUI Repo Path>
# make the script executable
chmod +x macos_run.sh
# Call the run script
./macos_run.sh
```
:::

## Step 3: Create Identity

![Creating Identity](/assets/images/products/AIMarketplace/TUI/CreatingIdentityTUI.webp)
1. Enter Identity name 
2. Select Type of ................ (We will use Key in our Onboarding)
3. Select Network (We will use Sepolia in our Onboarding)
<img src = "/assets/images/products/AIMarketplace/TUI/AccountDetailsMetamask.webp" style="width:40%">
4. Enter your private key from Metamask
![Filled Identity Page](/assets/images/products/AIMarketplace/TUI/FilledIdentityTUI.webp)
5. Press "Create Identity". Identity was successfully created!
## Step 4: Create organization

![Organization Page](/assets/images/products/AIMarketplace/TUI/OrganizationPageTUI.webp)
1. Go to the Organization Page
2. Go to the Manage > Create Organization
3. Enter Organization ID. This is an identification for your company. You can choose every available id. This data will be used by users when accessing via the CLI
4. Enter Metadata File Path. This is the path to JSON file that contain metadata of your organization.
![Filled Organization create page](/assets/images/products/AIMarketplace/TUI/FilledCreateOrganizationPage.webp)
5. Press "Create Organization". Organization was successfully created!
![Organization successfully created](/assets/images/products/AIMarketplace/TUI/OrganizationSuccessfullyCreatedTUI.webp)

## Step 5: Deposit some AGIX

![Account Page](/assets/images/products/AIMarketplace/TUI/AccountPage.webp)
1. Go to Account page
2. Go to Deposit 
3. Enter amount of AGIX Token you want to deposit.
![Filled Deposit Page](/assets/images/products/AIMarketplace/TUI/FilledDepositAGIXPage.webp)
4. Press "Deposit"


## Step 6: Create your own service
![Service Page](/assets/images/products/AIMarketplace/TUI/ServicePageTUI.webp)
1. Go to Services page
2. Go to Manage > Publish Service
3. Enter Organization ID. This is ID of your organization to which the service will be attached
4. Enter Service ID. This is ID of your service. This data will be used by users when accessing via the CLIs
5. Enter Metadata File Path. This is path to JSON file that contain metadata of your service.
![Filled Service Page](/assets/images/products/AIMarketplace/TUI/FilledServicePublishingPage.webp)
6. Press "Publish Service".