---
# Page settings
layout: default
keywords: intro concepts
comments: false

# Hero section
title: AI Developers

---
# Set up

- [Python 3.6+](https://www.python.org/downloads/)
- [Node 8+ with npm](https://nodejs.org/en/download/)
- [SNET CLI](https://github.com/singnet/snet-cli/releases)
    - libudev
    - libusb 1.0
- [SNET Daemon](https://github.com/singnet/snet-daemon/releases)

For example, installing the requirements using `Ubuntu 18.04`:

```sh
sudo apt-get update
sudo apt-get install wget git
sudo apt-get install python3 python3-pip
sudo apt-get install nodejs npm
sudo apt-get install libudev-dev libusb-1.0-0-dev
sudo pip3 install snet-cli

# !!! Get the latest snet-daemon from Github releases
SNETD_VERSION=`curl -s https://api.github.com/repos/singnet/snet-daemon/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")'`

cd /tmp
wget https://github.com/singnet/snet-daemon/releases/download/${SNETD_VERSION}/snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz
tar -xvf snet-daemon-${SNETD_VERSION}-linux-amd64.tar.gz
sudo mv snet-daemon-${SNETD_VERSION}-linux-amd64/snetd /usr/bin/snetd
```

# Publishing Service


### Setting Metadata

#### Let us define the values as below
```sh

    ORGID=test-org
    SERVICEID=test-service_id;
    DISPLAYNAME=Display Name;
    DOMAINNAME=https://daemondomainname;
    PORT=8088;
    ENDPOINT=$DOMAINNAME:$PORT  
    PRICE=0.00000001 #for the sake of an example
    HELPURL=https://helpurl;
    PATHFORSERVICESPEC=/pathtoyourproto/;
    SERVICEDESCRIPTION=Service Description;
    SHORTDESCRIPTION=Short Description of your service;
    CONTACTNAME=Name1;
    EMAILID=Nam1@yourorg;
    #Address to be registered for your Daemons
    DAEMONADDRESS="0xDBb9b2499c283cec176e7C707Ecb495B7a961ebf"
    FREECALLS=15
    #The address is of the Signer , who would issue you free tokens
    #Please note , if you are using market place Dapp , then we recommend to set the below
    #for free call Support 
    #for Ropsten the Signer Address is 0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F
    #for mainnet the Signer Address is 0x3Bb9b2499c283cec176e7C707Ecb495B7a961ebf
    SIGNERADDRESS="0x7DF35C98f41F3Af0df1dc4c7F7D4C19a71Dd059F"
    #Tags should be in small letters 
    TAGS=image-recognition; 
    #create a metadata file with the same name as the service id.
    MD_FILE="your_service.json";
    
```
#### Run the snet-cli commands as below
 ```sh 
 
snet service metadata-init --metadata-file $MD_FILE `pwd`/$YOURGITREPONAME/$PATHFORSERVICESPEC "$DISPLAYNAME" --encoding proto service-type grpc --group-name default_group
 
snet service metadata-set-fixed-price default_group $PRICE --metadata-file $MD_FILE

snet service metadata-add-endpoints default_group $DOMAINNAME:$PORT --metadata-file $MD_FILE

   
snet service metadata-add-description --metadata-file $MD_FILE --description "$SERVICEDESCRIPTION"  --short-description "$SHORTDESCRIPTION" --url "$HELPURL"
​
#if you want to support free calls , you will need to do the below 
snet service metadata-set-free-calls default_group $FREECALLS --metadata-file $MD_FILE


snet service metadata-set-freecall-signer-address default_group $SIGNERADDRESS --metadata-file $MD_FILE


snet service metadata-add-contributor "$CONTACTNAME" $EMAILID --metadata-file $MD_FILE

snet service metadata-add-daemon-addresses default_group $DAEMONADDRESS --metadata-file $MD_FILE


snet service metadata-add-assets service_metadata1.json hero_image
```
   
### Publish Service on Blockchain
You need to have some ether in your wallet to publish a service
You must be either the owner or a member to have permission to publish/delete/Modify a service

```sh
snet service publish $ORG_ID $SERVICE_ID --metadata-file $MD_FILE
```