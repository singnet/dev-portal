---
# Page settings
layout: default
keywords:
comments: false

# Hero section
title: Daemon SSL Setup Guide

# extralink box
extralink:
    title: Tutorials
    title_url: '/tutorials'
    external_url: false
    description: See all tutorials here

# Developer Newsletter
dev_news: true

# Micro navigation
micro_nav: true
       
---

0. Make sure your subdomain has been registered by the platform team. The subdomain needs to exist before you can request a ssl certificate.

1. Install certbot using the guide at https://certbot.eff.org/
    - Install certbot on the server that will host the certificate
    - For software, select "None of the Above", and choose your OS to get detail install intructions.
    - If you are using Ubuntu 18.04 LTS you can go direct to: https://certbot.eff.org/lets-encrypt/ubuntubionic-other
    - This guide also includes the process for getting a certificate, but specific instructions are also included below:


2. Here is an example of the running the `sudo certbot certonly` command, for `<domain_name>`

```
$ sudo certbot certonly
Saving debug log to /var/log/letsencrypt/letsencrypt.log

How would you like to authenticate with the ACME CA?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: Spin up a temporary webserver (standalone)
2: Place files in webroot directory (webroot)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 1   
Plugins selected: Authenticator standalone, Installer None
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): joel@singularitynet.io

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(A)gree/(C)ancel: A

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: n
Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
to cancel): <domain_name>
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for <domain_name>
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/<domain_name>/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/<domain_name>/privkey.pem
   Your cert will expire on 2019-05-22. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - Your account credentials have been saved in your Certbot
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

3. Get the certificate path and key using the command: `sudo certbot certificates`

```
$ sudo certbot certificates
Saving debug log to /var/log/letsencrypt/letsencrypt.log

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Found the following certs:
  Certificate Name: <domain_name>
    Domains: <domain_name>
    Expiry Date: 2019-05-22 23:22:26+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/<domain_name>/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/<domain_name>/privkey.pem
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

4. Base on the certificate paths from above, mount the certificate dir as a volume in your docker container. Note that the certificates
may be symbolic links, so you can't just mount `/etc/letsencrypt/live/<domain_name>/`.

```
$ sudo ls -la /etc/letsencrypt/live/<domain_name>/
total 12
drwxr-xr-x 2 root root 4096 Feb 22 00:22 .
drwx------ 3 root root 4096 Feb 22 00:22 ..
lrwxrwxrwx 1 root root   42 Feb 22 00:22 cert.pem -> ../../archive/<domain_name>/cert1.pem
lrwxrwxrwx 1 root root   43 Feb 22 00:22 chain.pem -> ../../archive/<domain_name>/chain1.pem
lrwxrwxrwx 1 root root   47 Feb 22 00:22 fullchain.pem -> ../../archive/<domain_name>/fullchain1.pem
lrwxrwxrwx 1 root root   45 Feb 22 00:22 privkey.pem -> ../../archive/<domain_name>/privkey1.pem
-rw-r--r-- 1 root root  692 Feb 22 00:22 README
```

Directory listing shows us that the link is relative and jumps two directories above. 
This means we need to mount `/etc/letsencrypt` (or mount where it points, e.g. `/etc/letsencrypt/archive/<domain_name>`, 
but this could break if certbot changes how it stores certs and manages renewals)

```
$ docker run -v /etc/letsencrypt:/etc/letsencrypt [...]
```
5. Updating daemon config
    
Add the following two entries to the daemon config
    "ssl_cert": "/etc/letsencrypt/live/<domain_name>/fullchain.pem",
    "ssl_key": "/etc/letsencrypt/live/<domain_name>/privkey.pem"


6. Registering your service with new endpoint and https

You'll need to update your service metadata to include the new ssl enabled endpoint.

This is in the section beginning `"endpoints": [`

7. Check cron or systemd timer is in place for renewal of certificates:

`cat /etc/cron.d/certbot` or `systemctl show certbot.timer`

(Ubuntu 18.04 uses systemd, so the latter command is the important one on that platform).

When the certificate updates, you'll have to restart your services so that snet daemon uses the new certificate.

To do this, you can add a script to `/etc/letsencrypt/renewal-hooks/deploy`

```
$ sudo bash -c 'cat > /etc/letsencrypt/renewal-hooks/deploy/restart_services.sh'
#!/bin/bash
docker restart [SERVICE_CONTAINER_NAME]
^D
$ chmod u+x /etc/letsencrypt/renewal-hooks/deploy/restart_services.sh
```