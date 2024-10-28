# ETCD Setup

## Port forwarding from domain to daemon host (Existing domain required)

This step depends on the web server which you are using. Set the port forwarding from your `<DAEMON_PORT>` to `<DAEMON_INTERNAL_ADDRESS>`:`<DAEMON_PORT>`

**Example** : `your_awesome_domain.com:<DAEMON_PORT>` --> `<DAEMON_INTERNAL ADDRESS>:<DAEMON_PORT>`

## Domain certificates generation (skip of you already have SSL enabled on your domain)
1) Install certbot following this instructions:

[https://certbot.eff.org/instructions?ws=other&os=ubuntufocal](https://certbot.eff.org/instructions?ws=other&os=ubuntufocal)

2) Create domain certificates:

Generate certificates with command:

`sudo certbot certonly`

(Follow prompts and choose standalone version, enter your daemon domain from item 1 when asked to. Ex. your_awesome_domain.com)
Get certificates path with next command (you should see 2 files **fullchain.pem** and **privkey.pem**):

`sudo certbot certificates`

3) Check if certificate renewal is enabled

`sudo systemctl show certbot.timer`

Certificates are valid for 90 days. You will have to restart your Daemon in future when you have updated the certs

**Result**: Now you should have "ssl_cert": fullchain.pem and "ssl_key": privkey.pem parameters for the daemon config file. This allows you to use the httpS daemon endpoint.

## ETCD setup
### Single node docker setup
1) Download installation script (works only on ubuntu)

`wget https://raw.githubusercontent.com/singnet/platform-setup/main/docker-etcd-setup.sh`

2) If you want to host your ETCD node on a separate network/Ethernet you should add its domain name in the configuration. To do so add the domain to hosts section of server.json file:

```json
 \"hosts\": [
        \"${public_ip}\",
        \"${private_ip}\",
        \"your.domain.com\", << Add it here, keep the \" around it
        \"127.0.0.1\"
    ],
```
3) Execute it (user must have sudo permissions)

`bash docker-etcd-setup.sh`
**!!!Data folder of the ETCD cluster will be created in the directory you are currently in. ALL YOUR EARNED MONEY WILL BE IN THIS FOLDER SO YOU SHOULDN’T LOSE IT **

4) Follow instructions of script

5) Read important information below

When asked for certificates validity time limit you can set them as long as you like. You won’t have to renew these certificates and restart the ETCD container. If you have to renew the certificates run these commands in the folder with current certificates:

```
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server.json | cfssljson -bare server

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=peer member-1.json | cfssljson -bare member-1

cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client.json | cfssljson -bare client

```

If for some reason your ETCD container is down use this command:

`docker start docker-etcd-node-1`

If your ETCD node keeps crashing, check its logs with this command and debug it:

`docker logs docker-etcd-node-1`

**Result**: If everything was done correctly you would have seen ETCD INSTALLED SUCCESSFULLY. If that is the case, now you should have a running docker container with ETCD cluster and new certificates for ETCD (path to them will be printed by script, look for CERTIFICATES PATH)